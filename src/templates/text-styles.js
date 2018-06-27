import camelizeFilter from '../filters';
import colorTemplate from './color';

const styleTextAlignment = style => {
  if (style.textAlign === undefined) {
    return ".left";
  }
  switch(style.textAlign.toLowerCase()) {
    case "left":
      return ".left";
      break;
    case "right":
      return ".right";
      break;
    case "center":
      return ".center";
      break;
    case "justify":
      return ".justified";
      break;
    default:
      return ".left";
  }
}

const styleLineHeight = style => {
  return style.lineHeight || "nil";
}
const styleLetterSpacing = style => {
  return style.letterSpacing || 1;
}

const styleColor = style => {
  return style.colorString || colorTemplate(style.color);
}

const textStyleTemplate = textStyles => `import UIKit

struct TextStyle {
  let font: UIFont
  let lineHeight: CGFloat?
  let textAlign: NSTextAlignment
  let letterSpacing: CGFloat
  let color: UIColor

  ${textStyles.map(style => `

    /* ${JSON.stringify(style,null,2)} */

  static var ${camelizeFilter(style.name)}: TextStyle = {
    return TextStyle(font: .${camelizeFilter(style.fontFace)}(ofSize: ${style.fontSize}),
                     lineHeight: ${styleLineHeight(style)},
                     textAlign: ${styleTextAlignment(style)},
                     letterSpacing: ${styleLetterSpacing(style)},
                     color: ${style.colorString})
      }`
  ).join('\n')}

  var attributes: [NSAttributedString.Key : Any] {

    var attribs = [NSAttributedString.Key : Any]();
    
  }

}`;

export default textStyleTemplate;
