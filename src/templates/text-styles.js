import { camelizeFilter, camelizeLeadingLowerFilter } from '../filters';
import colorTemplate from './color';

const styleTextAlignment = style => {
  if (style.textAlign === undefined) {
    return "nil";
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
      return "nil";
  }
}

const styleLineHeight = style => {
  return style.lineHeight || "nil";
}
const styleLetterSpacing = style => {
  if (style.letterSpacing === undefined) {
    return "nil";
  }
  return style.letterSpacing;
}

const styleColor = style => {
  return style.colorString || colorTemplate(style.color);
}

const styleComment = style => {
  // return `/* ${JSON.stringify(style, null,2)} */`;
  return ``;
}


const textStyleTemplate = textStyles => `
import UIKit

#if !swift(>=4.2)
extension NSAttributedString {
    public typealias Key = NSAttributedStringKey
}
#endif

public struct TextStyle {
    public let font: UIFont
    public let color: UIColor
    public let lineHeight: CGFloat?
    public let alignment: NSTextAlignment?
    public let kern: CGFloat?

    public var attributes: [NSAttributedString.Key : Any] {
      var attribs: [NSAttributedString.Key : Any] =
          [.font: self.font,
           .foregroundColor : self.color]

      if let kern = self.kern {
          attribs[.kern] = NSNumber(value: kern.native)
      }

      if self.alignment != nil || self.lineHeight != nil {
          let paragraphStyle = NSMutableParagraphStyle()

          if let alignment = self.alignment {
              paragraphStyle.alignment = alignment
          }
          if let lineHeight = self.lineHeight {
              paragraphStyle.minimumLineHeight = lineHeight
              paragraphStyle.maximumLineHeight = lineHeight
          }
          attribs[.paragraphStyle] = paragraphStyle
      }
      return attribs
    }

    func attributedString(for string: String) -> NSAttributedString {
      return NSAttributedString(string: string, attributes: self.attributes)
    }

}

extension TextStyle {
  ${textStyles.map(style => `
    ${styleComment(style)}
    public static var ${camelizeLeadingLowerFilter(style.name)}: TextStyle = {
      return TextStyle(font: .${camelizeFilter(style.fontFace)}(ofSize: ${style.fontSize}),
                       color: ${style.colorString},
                       lineHeight: ${styleLineHeight(style)},
                       alignment: ${styleTextAlignment(style)},
                       kern: ${styleLetterSpacing(style)})
    }()`
  ).join('')}
}`;

export default textStyleTemplate;
