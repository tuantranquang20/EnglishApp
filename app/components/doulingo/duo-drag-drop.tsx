/* eslint-disable react-native/no-unused-styles */
/* eslint-disable react/display-name */
import React, {
  createContext,
  Fragment,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  View,
  StyleSheet,
  LayoutRectangle,
  StyleProp,
  ViewStyle,
} from "react-native";
import { useSharedValue, runOnUI } from "react-native-reanimated";
import SortableWord from "./sortable-word";
import { calculateLayout, Offset } from "./layout";
import Word from "./word";
import Placeholder from "./placeholder";
import Lines from "./lines";
import type { DuoAnimatedStyleWorklet } from "./types";
import { color } from "~app/theme";
interface ComputeWordLayoutProps {
  children: JSX.Element[];
  offsets: Offset[];
  onLayout(params: {
    numLines: number;
    wordStyles: StyleProp<ViewStyle>[];
  }): void;
  onContainerWidth(width: number): void;
  wordBankAlignment: "center" | "left" | "right";
  wordBankOffsetY: number;
  wordHeight: number;
  lineHeight: number;
  wordGap: number;
}

export interface DuoDragDropProps {
  /** List of words */
  words: string[];
  /** Height of an individual word. Default: 45 */
  wordHeight?: number;
  /** The gap between each word / line: Default: 4 */
  wordGap?: number;
  /** The height of a single line in the top "answered" pile. Default: wordHeight * 1.2  */
  lineHeight?: number;
  /** The margin between the "Bank" pile and the "Answer" pile. Default: 20 */
  wordBankOffsetY?: number;
  /** Whether tap & drag gestures are disabled. Default: false */
  gesturesDisabled?: boolean;
  /** The offset between the "Bank" pile and the "Answer" pile. Default: 20 */
  wordBankAlignment?: "center" | "left" | "right";
  /** Overrides the default Word renderer */
  renderWord?: (word: string, index: number) => JSX.Element;
  /** Overrides the default Lines renderer */
  renderLines?: (props: {
    numLines: number;
    containerHeight: number;
    lineHeight: number;
  }) => JSX.Element;
  /** Overrides the default Placeholder renderer */
  renderPlaceholder?:
    | ((props: {
        style: {
          position: "absolute";
          height: number;
          top: number;
          left: number;
          width: number;
        };
      }) => JSX.Element)
    | null;
  /** Allows user to modify animation of the word while it's animating. NOTE: this must be a worklet */
  animatedStyleWorklet?: DuoAnimatedStyleWorklet;
  /** Runs when the drag-and-drop has rendered */
  onReady?: (ready: boolean) => void;
}

export const WordContext = createContext({
  wordHeight: 55,
  text: "",
  wordGap: 4,
});

export type DuoDragDropRef = {
  /** Returns an ordered list of words that are in the "word bank" as well as answered */
  getWords(): { answered: string[]; bank: string[] };
  /** Returns an array of words that are outside the "word bank" */
  getAnsweredWords(): string[];
  /**
   * Gets the order value of each word by the word's index.
   * -1 indicates that it's in the "bank"
   *
   * e.g. ["hello", "world", "foo", "bar"] -> [1, -1, 0, 2] corresponds to:
   * - ["hello", "foo", "bar"] (unordered) or
   * - ["foo", "hello", "bar"] (ordered) in the "answered" pile
   * - and ["world"] in the "bank" pile
   */
  getOffsets(): number[];
  /* Animates the word buttons to move to new positions */
  setOffsets(newOffsets: number[]): void;
};

const DuoDragDrop = React.forwardRef<DuoDragDropRef, DuoDragDropProps>(
  (props, ref) => {
    const {
      words,
      renderWord,
      renderLines,
      renderPlaceholder,
      gesturesDisabled,
      wordBankAlignment = "center",
      wordGap = 4,
      wordBankOffsetY = 20,
      wordHeight = 45,
      animatedStyleWorklet,
      onReady,
    } = props;
    const lineHeight = props.lineHeight || wordHeight * 1.2;
    const lineGap = lineHeight - wordHeight;
    const [layout, setLayout] = useState<{
      numLines: number;
      wordStyles: StyleProp<ViewStyle>[];
    } | null>(null);
    const [containerWidth, setContainerWidth] = useState(0);

    const wordElements = useMemo(() => {
      return words.map((word, index) => (
        <WordContext.Provider
          key={`${word}-${index}`}
          value={{ wordHeight, wordGap, text: word }}
        >
          {renderWord?.(word, index) || <Word />}
        </WordContext.Provider>
      ));
    }, [words, wordHeight, wordGap, renderWord]);

    const offsets = words.map(() => ({
      order: useSharedValue(0),
      width: useSharedValue(0),
      height: useSharedValue(0),
      x: useSharedValue(0),
      y: useSharedValue(0),
      originalX: useSharedValue(0),
      originalY: useSharedValue(0),
    }));

    useImperativeHandle(ref, () => ({
      getWords: () => {
        const answeredWords = [];
        const bankWords = [];
        for (let i = 0; i < offsets.length; i++) {
          const offset = offsets[i];
          const word = words[i];
          if (offset.order.value !== -1) {
            answeredWords.push({ word, order: offset.order.value });
          } else {
            bankWords.push({ word, order: offset.order.value });
          }
        }
        return {
          answered: answeredWords
            .sort((a, b) => a.order - b.order)
            .map((w) => w.word),
          bank: bankWords.sort((a, b) => a.order - b.order).map((w) => w.word),
        };
      },
      // Returns an array of words that are outside the "word bank"
      getAnsweredWords: () => {
        const answeredWords = [];
        for (let i = 0; i < offsets.length; i++) {
          const offset = offsets[i];
          if (offset.order.value !== -1) {
            const word = words[i];
            answeredWords.push({ word, order: offset.order.value });
          }
        }
        // Sort by the order, and return the words in an ordered array
        return answeredWords
          .sort((a, b) => a.order - b.order)
          .map((w) => w.word);
      },
      // Gets the order value of each word by their index
      getOffsets() {
        return offsets.map((o) => o.order.value);
      },
      // Animates the word buttons to move to new positions
      setOffsets(newOffsets: number[]) {
        runOnUI(() => {
          for (let i = 0; i < newOffsets.length; i++) {
            offsets[i].order.value = newOffsets[i];
          }
          setTimeout(
            () =>
              calculateLayout(
                offsets,
                containerWidth,
                wordHeight,
                wordGap,
                lineGap
              ),
            16
          );
        })();
      },
    }));

    const initialized = layout && containerWidth > 0;

    // Toggle right-to-left layout
    useEffect(() => {
      if (initialized) {
        runOnUI(() => {
          calculateLayout(
            offsets,
            containerWidth,
            wordHeight,
            wordGap,
            lineGap
          );
        })();
      }
    }, [initialized, offsets, containerWidth, wordHeight, wordGap, lineGap]);

    useEffect(() => {
      // Notify parent the initialized status
      onReady?.(!!initialized);
    }, [initialized, onReady]);

    useEffect(() => {
      // Reset layout when the values change
      setLayout(null);
    }, [wordBankOffsetY, wordBankAlignment, wordGap, wordHeight]);

    // We first have to render the (opacity=0) child components in order to obtain x/y/width/height of every word segment
    // This will allow us to position the elements in the Lines
    if (!initialized) {
      return (
        <ComputeWordLayout
          offsets={offsets}
          onContainerWidth={setContainerWidth}
          onLayout={setLayout}
          wordHeight={wordHeight}
          lineHeight={lineHeight}
          wordBankAlignment={wordBankAlignment}
          wordBankOffsetY={wordBankOffsetY}
          wordGap={wordGap}
        >
          {wordElements}
        </ComputeWordLayout>
      );
    }

    const { numLines, wordStyles } = layout;

    // Add an extra line to account for certain word combinations that can wrap over to a new line
    const idealNumLines = numLines < 3 ? numLines + 1 : numLines;
    const linesContainerHeight = idealNumLines * lineHeight || lineHeight;
    /** Since word bank is absolutely positioned, estimate the total height of container with offsets */
    const wordBankHeight =
      numLines * (wordHeight + wordGap * 2) + wordBankOffsetY * 2;

    const PlaceholderComponent = renderPlaceholder || Placeholder;
    const LinesComponent = renderLines || Lines;

    return (
      <View style={rnStyles.container}>
        <LinesComponent
          numLines={idealNumLines}
          containerHeight={linesContainerHeight}
          lineHeight={lineHeight}
        />
        <View style={{ minHeight: wordBankHeight }} />
        {wordElements.map((child, index) => (
          <Fragment key={`${words[index]}-f-${index}`}>
            {renderPlaceholder === null ? null : (
              <PlaceholderComponent style={wordStyles[index] as any} />
            )}
            <SortableWord
              offsets={offsets}
              index={index}
              containerWidth={containerWidth}
              gesturesDisabled={Boolean(gesturesDisabled)}
              linesHeight={linesContainerHeight}
              lineGap={lineGap}
              wordHeight={wordHeight}
              wordGap={wordGap}
              wordBankOffsetY={wordBankOffsetY}
              animatedStyleWorklet={animatedStyleWorklet}
            >
              {child}
            </SortableWord>
          </Fragment>
        ))}
      </View>
    );
  }
);

function ComputeWordLayout({
  wordGap,
  children,
  offsets,
  onLayout,
  onContainerWidth,
  wordHeight,
  lineHeight,
  wordBankAlignment,
  wordBankOffsetY,
}: ComputeWordLayoutProps) {
  const calculatedOffsets = useRef<LayoutRectangle[]>([]);
  const offsetStyles = useRef<StyleProp<ViewStyle>[]>([]);

  return (
    <View
      style={[rnStyles.computeWordLayoutContainer, rnStyles[wordBankAlignment]]}
      onLayout={(e) => {
        onContainerWidth(e.nativeEvent.layout.width);
      }}
    >
      {children.map((child, index) => {
        return (
          <View
            key={`compute.${index}`}
            onLayout={(e) => {
              const { x, y, width, height } = e.nativeEvent.layout;
              calculatedOffsets.current[index] = { width, height, x, y };

              if (
                Object.keys(calculatedOffsets.current).length ===
                children.length
              ) {
                const numLines = new Set();
                for (const index in calculatedOffsets.current) {
                  const { y } = calculatedOffsets.current[index];
                  numLines.add(y);
                }
                const numLinesSize =
                  numLines.size < 3 ? numLines.size + 1 : numLines.size;
                const linesHeight = numLinesSize * lineHeight;
                for (const index in calculatedOffsets.current) {
                  const { x, y, width } = calculatedOffsets.current[index];
                  const offset = offsets[index];
                  offset.order.value = -1;
                  offset.width.value = width;
                  offset.originalX.value = x;
                  offset.originalY.value = y + linesHeight + wordBankOffsetY;

                  offsetStyles.current[index] = {
                    position: "absolute",
                    height: wordHeight,
                    top: y + linesHeight + wordBankOffsetY * 2,
                    left: x + wordGap,
                    width: width - wordGap * 2,
                  };
                }
                setTimeout(() => {
                  onLayout({
                    numLines: numLines.size,
                    wordStyles: offsetStyles.current,
                  });
                }, 16);
              }
            }}
          >
            {child}
          </View>
        );
      })}
    </View>
  );
}

const DuoDragDropInstance = React.forwardRef<DuoDragDropRef, DuoDragDropProps>(
  (props, ref) => {
    const wordsKey = JSON.stringify(props.words);
    // We need to re-mount the component if words are modified to avoid hook mismatches. "useSharedValue" is initialized on every word
    return (
      <View style={rnStyles.container}>
        <DuoDragDrop ref={ref} {...props} key={wordsKey} />
      </View>
    );
  }
);

export default React.memo(DuoDragDropInstance);
const rnStyles = StyleSheet.create({
  center: {
    justifyContent: "center",
  },
  computeWordLayoutContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    opacity: 0,
  },
  container: {
    backgroundColor: color.palette.white,
    flex: 1,
    position: "relative",
  },
  left: {
    justifyContent: "flex-start",
  },
  right: {
    justifyContent: "flex-end",
  },
});
