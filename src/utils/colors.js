/**
 * Utils: Utilities.
 * - Global functions that can be used across multiple files.
 * -----------------------------------------------------------------------------
 */

/**
 * Sets the body background colour and text colour
 * @param colour
 * @param background
 */
export function setAppColours(colour, background){
    document.body.style.setProperty(
        'color',
        colour
    )

    document.body.style.setProperty(
        'background-color',
        background
    )
}