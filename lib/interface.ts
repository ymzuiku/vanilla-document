
interface IGlobalValues {
  inherit: string;
  initial: string;
  unset: string;
}
interface IPosition {
  relative: string;
  absolute: string;
  fixed: string;
  static: string;
  inherit: string;
  sticky: string;
  '-webkit-sticky': string;
}

interface IDisplay {
  /**此元素不会被显示。 */
  none: string;
  flex: string|number;
  /** 此元素将显示为块级元素，此元素前后会带有换行符。 */
  block: string;
  /** 默认。此元素会被显示为内联元素，元素前后没有换行符。 */
  inline: string;
  /** 行内块元素。（CSS2.1 新增的值） */
  'inline-block': string;
  /** 此元素会作为列表显示。 */
  'list-item': string;
  /** 此元素会根据上下文作为块级元素或内联元素显示。*/
  'run-in': string;
  /** 此元素会作为块级表格来显示（类似 <table>），表格前后带有换行符。 */
  table: string;
  /**此元素会作为内联表格来显示（类似 <table>），表格前后没有换行符。 */
  'inline-table': string;
  /**此元素会作为一个或多个行的分组来显示（类似 <tbody>）。 */
  'table-row-group': string;
  /** 此元素会作为一个或多个行的分组来显示（类似 <thead>）。 */
  'table-header-group': string;
  /** 此元素会作为一个或多个行的分组来显示（类似 <tfoot>）。 */
  'table-footer-group': string;
  /**此元素会作为一个表格行显示（类似 <tr>）。 */
  'table-row': string;
  /** 此元素会作为一个或多个列的分组来显示（类似 <colgroup>）。 */
  'table-column-group': string;
  /** 此元素会作为一个单元格列显示（类似 <col>） */
  'table-column': string;
  /** 此元素会作为一个表格单元格显示（类似 <td> 和 <th>） */
  'table-cell': string;
  /** 此元素会作为一个表格标题显示（类似 <caption>） */
  'table-caption': string;
  /**	规定应该从父元素继承 display 属性的值。 */
  inherit: string;
}

export interface IStyle {
  alignContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'stretch'
    | 'space-between'
    | 'space-around'
    | keyof IGlobalValues;
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline' | keyof IGlobalValues;
  alignSelf?: 'auto' | 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline' | keyof IGlobalValues;
  alignmentBaseline?: string | null;
  animation?: string;
  animation__snippet?: 'name 1s linear 0s infinite normal both running'|'name 3s linear 1s infinite running'|'name 3s linear 1s infinite alternate'|'name .5s linear 1s infinite alternate'
  animationDelay?: string;
  animationDirection?: 'normal'|'reverse'|'alternate'|'alternate-reverse';
  animationDuration?: string;
  animationFillMode?: 'none'|'forwards'|'backwards'|'both';
  animationIterationCount?: string;
  animationName?: string;
  animationPlayState?: string;
  animationTimingFunction?: string;
  backfaceVisibility?: string | null;
  background?: string | null;
  background__snippet?: 'rgba(0,0,0,0)' | '#fff' | 'linear-gradient(180deg, red, blue)';
  backgroundAttachment?: 'scroll' | 'fixed' | 'local';
  backgroundClip?: 'padding-box' | 'border-box' | 'content-box' | keyof IGlobalValues;
  backgroundColor?: string | null;
  backgroundImage?: string | null;
  backgroundImage__snippet?: 'url(bgimage.gif)';
  backgroundOrigin?: 'padding-box' | 'border-box' | 'content-box' | keyof IGlobalValues;
  backgroundPosition?: string | null;
  backgroundPosition__snippet?: 'inherit' | '0% 50%';
  backgroundPositionX?: string | null;
  backgroundPositionY?: string | null;
  backgroundRepeat?: string | null;
  backgroundSize?: string | null;
  baselineShift?: string | null;
  border?: string | null;
  border__snippet?: '1px solid #000' | '1px solid rgba(0,0,0,0.1)';
  borderBottom?: string | null;
  borderBottomColor?: string | null;
  borderBottomLeftRadius?: string | null;
  borderBottomRightRadius?: string | null;
  borderBottomStyle?: string | null;
  borderBottomWidth?: string | null;
  borderCollapse?: string | null;
  borderColor?: string | null;
  borderImage?: string | null;
  borderImageOutset?: string | null;
  borderImageRepeat?: string | null;
  borderImageSlice?: string | null;
  borderImageSource?: string | null;
  borderImageWidth?: string | null;
  borderLeft?: string | null;
  borderLeftColor?: string | null;
  borderLeftStyle?: string | null;
  borderLeftWidth?: string | null;
  borderRadius?: string | null;
  borderRight?: string | null;
  borderRightColor?: string | null;
  borderRightStyle?: string | null;
  borderRightWidth?: string | null;
  borderSpacing?: string | null;
  borderStyle?:
    | 'none'
    | 'hidden'
    | 'dotted'
    | 'dashed'
    | 'solid'
    | 'double'
    | 'groove'
    | 'ridge'
    | 'inset'
    | 'outset'
    | 'inherit';
  borderTop?: string | null;
  borderTopColor?: string | null;
  borderTopLeftRadius?: string | null;
  borderTopRightRadius?: string | null;
  borderTopStyle?: string | null;
  borderTopWidth?: string | null;
  borderWidth?: string | null;
  bottom?: string | null;
  boxShadow?: string | null;
  boxSizing?: 'content-box' | 'border-box' | keyof IGlobalValues;;
  breakAfter?: string | null;
  breakBefore?: string | null;
  breakInside?: string | null;
  captionSide?: string | null;
  caretColor?: string;
  clear?: 'none' | 'left' | 'right' | 'both' | 'inherit';
  clip?: string;
  clipPath?: string;
  clipRule?: string;
  color?: string | null;
  colorInterpolationFilters?: string;
  columnCount?: string;
  columnFill?: string;
  columnGap?: string;
  columnRule?: string;
  columnRuleColor?: string;
  columnRuleStyle?: string;
  columnRuleWidth?: string;
  columnSpan?: string;
  columnWidth?: string;
  columns?: string;
  content?: string | null;
  counterIncrement?: string | null;
  counterReset?: string | null;
  cssFloat?: 'left'|'right'|'none'|'inherit';
  float?:'left'|'right'|'none'|'inherit';
  cssText?: string;
  cursor?:
    | 'auto'
    | 'default'
    | 'pointer'
    | 'crosshair'
    | 'move'
    | 'e-resize'
    | 'ne-resize'
    | 'nw-resize'
    | 'n-resize'
    | 'se-resize'
    | 'sw-resize'
    | 's-resize'
    | 'w-resize'
    | 'text'
    | 'wait'
    | 'help';
  direction?: string;
  display?: keyof IDisplay;
  dominantBaseline?: string | null;
  emptyCells?: string | null;
  enableBackground?: string | null;
  fill?: string | null;
  fillOpacity?: string | null;
  fillRule?: string | null;
  filter?: string;
  flex?: string | number | null;
  flexBasis?: string | null;
  flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  flexFlow?: string | null;
  flexGrow?: string | null;
  flexShrink?: string | null;
  flexWrap?: string | null;
  floodColor?: string;
  floodOpacity?: string;
  font?: string;
  fontFamily__snippet?:
    | '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";'
    | 'Georgia,Cambria,"Times New Roman",Times,serif'
    | 'Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace';
  fontFamily?: string;
  fontFeatureSettings?: string;
  fontKerning?: string;
  fontSize?: string;
  fontSizeAdjust?: string;
  fontStretch?: string;
  fontStyle?: string;
  fontSynthesis?: string;
  fontVariant?: string;
  fontVariantCaps?: string;
  fontVariantEastAsian?: string;
  fontVariantLigatures?: string;
  fontVariantNumeric?: string;
  fontVariantPosition?: string;
  fontWeight?:
    | 'normal'
    | 'bold'
    | 'bolder'
    | 'lighter'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '800'
    | '900'
    | keyof IGlobalValues;
  gap?: string;
  glyphOrientationHorizontal?: string | null;
  glyphOrientationVertical?: string;
  grid?: string | null;
  gridArea?: string | null;
  gridAutoColumns?: string | null;
  gridAutoFlow?: string | null;
  gridAutoRows?: string | null;
  gridColumn?: string | null;
  gridColumnEnd?: string | null;
  gridColumnGap?: string;
  gridColumnStart?: string | null;
  gridGap?: string;
  gridRow?: string | null;
  gridRowEnd?: string | null;
  gridRowGap?: string;
  gridRowStart?: string | null;
  gridTemplate?: string | null;
  gridTemplateAreas?: string | null;
  gridTemplateColumns?: string | null;
  gridTemplateRows?: string | null;
  height?: string | null;
  hyphens?: string;
  imageOrientation?: string;
  imageRendering?: string;
  imeMode?: string | null;
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | keyof IGlobalValues;
  justifyItems?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | keyof IGlobalValues;
  justifySelf?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | keyof IGlobalValues;
  kerning?: string | null;
  /** ios 不支持 */
  overscrollBehavior?:'auto'|'contain'|'none';
  layoutGrid?: string | null;
  layoutGridChar?: string | null;
  layoutGridLine?: string | null;
  layoutGridMode?: string | null;
  layoutGridType?: string | null;
  left?: string | null;
  letterSpacing?: string;
  lightingColor?: string;
  lineBreak?: string;
  lineHeight?: string | null;
  listStyle?: string | null;
  listStyleImage?: string | null;
  listStylePosition?: string | null;
  listStyleType?: string | null;
  margin?: string | null;
  marginBottom?: string | null;
  marginLeft?: string | null;
  marginRight?: string | null;
  marginTop?: string | null;
  marker?: string | null;
  markerEnd?: string | null;
  markerMid?: string | null;
  markerStart?: string | null;
  mask?: string;
  maskComposite?: string;
  maskImage?: string;
  maskPosition?: string;
  maskRepeat?: string;
  maskSize?: string;
  maskType?: string;
  maxHeight?: string | null;
  maxWidth?: string | null;
  minHeight?: string | null;
  minWidth?: string | null;
  msContentZoomChaining?: string | null;
  msContentZoomLimit?: string | null;
  msContentZoomLimitMax?: any;
  msContentZoomLimitMin?: any;
  msContentZoomSnap?: string | null;
  msContentZoomSnapPoints?: string | null;
  msContentZoomSnapType?: string | null;
  msContentZooming?: string | null;
  msFlowFrom?: string | null;
  msFlowInto?: string | null;
  msFontFeatureSettings?: string | null;
  msGridColumn?: any;
  msGridColumnAlign?: string | null;
  msGridColumnSpan?: any;
  msGridColumns?: string | null;
  msGridRow?: any;
  msGridRowAlign?: string | null;
  msGridRowSpan?: any;
  msGridRows?: string | null;
  msHighContrastAdjust?: string | null;
  msHyphenateLimitChars?: string | null;
  msHyphenateLimitLines?: any;
  msHyphenateLimitZone?: any;
  msHyphens?: string | null;
  msImeAlign?: string | null;
  msOverflowStyle?: string | null;
  msScrollChaining?: string | null;
  msScrollLimit?: string | null;
  msScrollLimitXMax?: any;
  msScrollLimitXMin?: any;
  msScrollLimitYMax?: any;
  msScrollLimitYMin?: any;
  msScrollRails?: string | null;
  msScrollSnapPointsX?: string | null;
  msScrollSnapPointsY?: string | null;
  msScrollSnapType?: string | null;
  msScrollSnapX?: string | null;
  msScrollSnapY?: string | null;
  msScrollTranslation?: string | null;
  msTextCombineHorizontal?: string | null;
  msTextSizeAdjust?: any;
  msTouchAction?: string | null;
  msTouchSelect?: string | null;
  msUserSelect?: string | null;
  msWrapFlow?: string;
  msWrapMargin?: any;
  msWrapThrough?: string;
  objectFit?: 'none' | 'fill' | 'contain' | 'cover' | 'scale-down';
  objectPosition?: string;
  objectPosition__snippet?: '50% 50%';
  opacity?: string | number | null;
  order?: string | null;
  orphans?: string | null;
  outline?: string;
  outlineColor?: string;
  outlineOffset?: string;
  outlineStyle?: string;
  outlineWidth?: string;
  overflow?: 'visible' | 'hidden' | 'scroll' | 'auto' | 'inherit';
  overflowAnchor?: string;
  overflowWrap?: string;
  overflowX?: 'visible' | 'hidden' | 'scroll' | 'auto' | 'inherit';
  overflowY?: 'visible' | 'hidden' | 'scroll' | 'auto' | 'inherit';
  padding?: string | null;
  paddingBottom?: string | null;
  paddingLeft?: string | null;
  paddingRight?: string | null;
  paddingTop?: string | null;
  pageBreakAfter?: string | null;
  pageBreakBefore?: string | null;
  pageBreakInside?: string | null;
  penAction?: string | null;
  perspective?: string | null;
  perspectiveOrigin?: string | null;
  placeContent?: string;
  placeItems?: string;
  placeSelf?: string;
  pointerEvents?:
    | 'auto'
    | 'none'
    | 'inherit'
    | 'initial'
    | 'unset'
    | 'visiblePainted'
    | 'visibleFill'
    | 'visibleStroke'
    | 'visible'
    | 'painted'
    | 'fill'
    | 'stroke'
    | 'all';
  position?: keyof IPosition;
  quotes?: string | null;
  resize?: 'none' | 'both' | 'horizontal' | 'vertical' | 'block' | 'inline' | keyof IGlobalValues;
  right?: string | null;
  rotate?: string | null;
  rowGap?: string;
  rubyAlign?: string | null;
  rubyOverhang?: string | null;
  rubyPosition?: string | null;
  scale?: string | null;
  scrollBehavior?: string;
  stopColor?: string | null;
  stopOpacity?: string | null;
  stroke?: string | null;
  strokeDasharray?: string | null;
  strokeDashoffset?: string | null;
  strokeLinecap?: string | null;
  strokeLinejoin?: string | null;
  strokeMiterlimit?: string | null;
  strokeOpacity?: string | null;
  strokeWidth?: string | null;
  tabSize?: string;
  tableLayout?: 'auto' | 'fixed' | keyof IGlobalValues;
  textAlign?: 'left'|'right'|'center'|'justify'|'inherit';
  textAlignLast?: 'auto'|'left'|'right'|'center'|'justify'|'inherit'|'start'|'end'|'initial';
  textAnchor?: string | null;
  textCombineUpright?: string;
  textDecoration?: 'none'|'underline'|'overline'|'line-through'|'blink'|'inherit';
  textDecorationColor?: string;
  textDecorationLine?: 'none'|'underline'|'overline'|'line-through'|'blink'|'inherit';
  textDecorationStyle?: 'solid'|'double'|'dotted'|'dashed'|'wavy'|'initial'|'inherit';
  textEmphasis?: string;
  textEmphasisColor?: string;
  textEmphasisPosition?: string;
  textEmphasisStyle?: string;
  textIndent?: string;
  textJustify?: string;
  textKashida?: string | null;
  textKashidaSpace?: string | null;
  textOrientation?: string;
  textOverflow?: 'clip'|'ellipsis'|string;
  textShadow?: string;
  textTransform?: 'none'|'capitalize'|'uppercase'|'lowercase'|'inherit';
  textUnderlinePosition?: string;
  top?: string | null;
  touchAction?: string;
  transform?: string;
  transform__snippet?:
    | 'none'
    | 'translate(0px, 0px)'
    | 'translateY(0px)'
    | 'perspective(500px) translate3d(0px,0px,0px)'
    | 'scale(1,1)'
    | 'rotate(0deg)';
  transformBox?: string;
  transformOrigin?: string;
  transformStyle?: string | null;
  transition?: string;
  transition__snippet?:
    | 'all 0.2s ease-in'
    | 'all 0.2s ease-out'
    | 'all 0.2s ease'
    | 'all 0.2s ease-in-out'
    | 'all 0.2s linear'
    | 'all 0.2s cubic-bezier(0,0.25,0.75,1)';
  transitionDelay?: string;
  transitionDuration?: string;
  transitionProperty?: string;
  transitionTimingFunction?: string;
  translate?: string | null;
  unicodeBidi?: string;
  userSelect?: 'none' | 'auto' | 'text' | 'contain' | 'all' | keyof IGlobalValues;
  verticalAlign?: string | null;
  visibility?: string | null;
  /** @deprecated */
  webkitAlignContent?: string;
  /** @deprecated */
  webkitAlignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline' | IGlobalValues;
  /** @deprecated */
  webkitAlignSelf?: string;
  /** @deprecated */
  webkitAnimation?: string;
  /** @deprecated */
  webkitAnimationDelay?: string;
  /** @deprecated */
  webkitAnimationDirection?: string;
  /** @deprecated */
  webkitAnimationDuration?: string;
  /** @deprecated */
  webkitAnimationFillMode?: string;
  /** @deprecated */
  webkitAnimationIterationCount?: string;
  /** @deprecated */
  webkitAnimationName?: string;
  /** @deprecated */
  webkitAnimationPlayState?: string;
  /** @deprecated */
  webkitAnimationTimingFunction?: string;
  /** @deprecated */
  webkitAppearance?: string;
  /** @deprecated */
  webkitBackfaceVisibility?: string;
  /** @deprecated */
  webkitBackgroundClip?: string;
  /** @deprecated */
  webkitBackgroundOrigin?: string;
  /** @deprecated */
  webkitBackgroundSize?: string;
  /** @deprecated */
  webkitBorderBottomLeftRadius?: string;
  /** @deprecated */
  webkitBorderBottomRightRadius?: string;
  webkitBorderImage?: string | null;
  /** @deprecated */
  webkitBorderRadius?: string;
  /** @deprecated */
  webkitBorderTopLeftRadius?: string;
  /** @deprecated */
  webkitBorderTopRightRadius?: string;
  /** @deprecated */
  webkitBoxAlign?: string;
  webkitBoxDirection?: string | null;
  /** @deprecated */
  webkitBoxFlex?: string;
  /** @deprecated */
  webkitBoxOrdinalGroup?: string;
  webkitBoxOrient?: string | null;
  /** @deprecated */
  webkitBoxPack?: string;
  /** @deprecated */
  webkitBoxShadow?: string;
  /** @deprecated */
  webkitBoxSizing?: string;
  webkitColumnBreakAfter?: string | null;
  webkitColumnBreakBefore?: string | null;
  webkitColumnBreakInside?: string | null;
  webkitColumnCount?: any;
  webkitColumnGap?: any;
  webkitColumnRule?: string | null;
  webkitColumnRuleColor?: any;
  webkitColumnRuleStyle?: string | null;
  webkitColumnRuleWidth?: any;
  webkitColumnSpan?: string | null;
  webkitColumnWidth?: any;
  webkitColumns?: string | null;
  /** @deprecated */
  webkitFilter?: string;
  /** @deprecated */
  webkitFlex?: string;
  /** @deprecated */
  webkitFlexBasis?: string;
  /** @deprecated */
  webkitFlexDirection?: string;
  /** @deprecated */
  webkitFlexFlow?: string;
  /** @deprecated */
  webkitFlexGrow?: string;
  /** @deprecated */
  webkitFlexShrink?: string;
  /** @deprecated */
  webkitFlexWrap?: string;
  /** @deprecated */
  webkitJustifyContent?: string;
  webkitLineClamp?: string;
  /** @deprecated */
  webkitMask?: string;
  /** @deprecated */
  webkitMaskBoxImage?: string;
  /** @deprecated */
  webkitMaskBoxImageOutset?: string;
  /** @deprecated */
  webkitMaskBoxImageRepeat?: string;
  /** @deprecated */
  webkitMaskBoxImageSlice?: string;
  /** @deprecated */
  webkitMaskBoxImageSource?: string;
  /** @deprecated */
  webkitMaskBoxImageWidth?: string;
  /** @deprecated */
  webkitMaskClip?: string;
  /** @deprecated */
  webkitMaskComposite?: string;
  /** @deprecated */
  webkitMaskImage?: string;
  /** @deprecated */
  webkitMaskOrigin?: string;
  /** @deprecated */
  webkitMaskPosition?: string;
  /** @deprecated */
  webkitMaskRepeat?: string;
  /** @deprecated */
  webkitMaskSize?: string;
  /** @deprecated */
  webkitOrder?: string;
  /** @deprecated */
  webkitPerspective?: string;
  /** @deprecated */
  webkitPerspectiveOrigin?: string;
  webkitTapHighlightColor?: string | null;
  /** @deprecated */
  webkitTextFillColor?: string;
  /** @deprecated */
  webkitTextSizeAdjust?: string;
  /** @deprecated */
  webkitTextStroke?: string;
  /** @deprecated */
  webkitTextStrokeColor?: string;
  /** @deprecated */
  webkitTextStrokeWidth?: string;
  /** @deprecated */
  webkitTransform?: string;
  /** @deprecated */
  webkitTransformOrigin?: string;
  /** @deprecated */
  webkitTransformStyle?: string;
  /** @deprecated */
  webkitTransition?: string;
  /** @deprecated */
  webkitTransitionDelay?: string;
  /** @deprecated */
  webkitTransitionDuration?: string;
  /** @deprecated */
  webkitTransitionProperty?: string;
  /** @deprecated */
  webkitTransitionTimingFunction?: string;
  webkitUserModify?: string | null;
  webkitUserSelect?: string | null;
  webkitWritingMode?: string | null;
  whiteSpace?: string;
  widows?: string | null;
  width?: string | null;
  willChange?: 'auto' | 'scroll-position' | 'contents' | 'transform'|'opacity'|'left, top'| keyof IGlobalValues;
  wordBreak?: 'normal' | 'break-oall' | 'keep-all' | 'break-word';
  /** 3px|0.3em|inherit|normal(default) */
  wordSpacing?: string;
  wordSpacing__snippet?: 'normal' |'3px'|'0.3em'|'inherit';
  wordWrap?: string;
  writingMode?: string;
  zIndex?: string | number | null;
  zoom?: string | null;
  [index: number]: string;
  [key: string]: any;
}

export interface IProps {
  [key:string]: any,
  [index:number]:any,
  onclick?: any,
  oninput?: any,
  accessKey?: string;
  autocapitalize?: string;
  dir?: string;
  draggable?: boolean;
  hidden?: boolean;
  innerText?: string;
  lang?: string;
  spellcheck?: boolean;
  title?: string;
  translate?: boolean;
  accept?: string;
  align?: string;
  alt?: string;
  autocomplete?: string;
  autofocus?: boolean;
  checked?: boolean;
  defaultChecked?: boolean;
  defaultValue?: string;
  dirName?: string;
  disabled?: boolean;
  files?: FileList | null;
  formAction?: string;
  formEnctype?: string;
  formMethod?: string;
  formNoValidate?: boolean;
  formTarget?: string;
  height?: number;
  indeterminate?: boolean;
  /**
   * Defines the maximum acceptable value for an input element with type="number".When used with the min and step attributes, lets you control the range and increment (such as only even numbers) that the user can enter into an input field.
   */
  max?: string;
  /**
   * Sets or retrieves the maximum number of characters that the user can enter in a text control.
   */
  maxLength?: number;
  /**
   * Defines the minimum acceptable value for an input element with type="number". When used with the max and step attributes, lets you control the range and increment (such as even numbers only) that the user can enter into an input field.
   */
  min?: string;
  minLength?: number;
  /**
   * Sets or retrieves the Boolean value indicating whether multiple items can be selected from a list.
   */
  multiple?: boolean;
  /**
   * Sets or retrieves the name of the object.
   */
  name?: string;
  /**
   * Gets or sets a string containing a regular expression that the user's input must match.
   */
  pattern?: string;
  /**
   * Gets or sets a text string that is displayed in an input field as a hint or prompt to users as the format or type of information they need to enter.The text appears in an input field until the user puts focus on the field.
   */
  placeholder?: string;
  readOnly?: boolean;
  /**
   * When present, marks an element that can't be submitted without a value.
   */
  required?: boolean;
  selectionDirection?: string | null;
  /**
   * Gets or sets the end position or offset of a text selection.
   */
  selectionEnd?: number | null;
  /**
   * Gets or sets the starting position or offset of a text selection.
   */
  selectionStart?: number | null;
  size?: number;
  /**
   * The address or URL of the a media resource that is to be considered.
   */
  src?: string;
  /**
   * Defines an increment or jump between values that you want to allow the user to enter. When used with the max and min attributes, lets you control the range and increment (for example, allow only even numbers) that the user can enter into an input field.
   */
  step?: string;
  /**
   * Returns the content type of the object.
   */
  type?: string;
  /**
   * Sets or retrieves the URL, often with a bookmark extension (#name), to use as a client-side image map.
   */
  /** @deprecated */
  useMap?: string;
  /**
   * Returns the value of the data at the cursor's current position.
   */
  value?: string;
  /**
   * Returns a Date object representing the form control's value, if applicable; otherwise, returns null. Can be set, to change the value. Throws an "InvalidStateError" DOMException if the control isn't date- or time-based.
   */
  valueAsDate?: Date | null;
  /**
   * Returns the input field value as a number.
   */
  valueAsNumber?: number;
  /**
   * Sets or retrieves the width of the object.
   */
  width?: number;
}

export {}