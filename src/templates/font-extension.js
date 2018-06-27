import camelizeFilter from '../filters';

const fontExtensionTemplate = uniqueFonts => `import UIKit

extension UIFont {
${uniqueFonts.map(styleName => `
    static func ${camelizeFilter(styleName)}(ofSize: CGFloat) -> UIFont {
        // swiftlint:disable:next force_unwrapping
        return UIFont(name: "${styleName}", size: size)!
    }`
).join('\n')}
}`;

export default fontExtensionTemplate;
