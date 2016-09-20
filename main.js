/**
 * @author Daniel Winkel Pedersen <d@dwpweb.dk>
 * @interface jQuery
 * @version 0.0.1
 * @license MIT
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software
 * and associated documentation files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or
 * substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
 * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
 * FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
 * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 */

(function ($) {
    $(document).ready(function () {

        /**
         * The display value.
         * @type {string}
         */
        var display = "";

        /**
         * The expression value.
         * @type {string}
         */
        var expression = "";

        /**
         * Whether or not the current expression has been evaluated or not.
         * @type {boolean}
         */
        var hasCalculated = false;

        /**
         * Whether or not a comma has been placed in display value
         * @type {boolean}
         */
        var hasComma = false;

        /**
         * Listens for clicks on elements with the class 'btn' and an attribute of
         * 'data-value'. If the previous step was a calculation, the display will be reset.
         * Else the data value is added to the display.
         */
        $('.btn[data-value]').on('click', function () {

            if (hasCalculated) {
                resetDisplay();
                hasCalculated = false;
            }

            updateValue($(this).attr('data-value'));
        });

        /**
         * Listens for clicks on elements with the class 'btn' and an attribute of
         * 'data-operation'. If the display is not empty, it runs updateExpression() with the appropriate
         * data-operation and value. If the data-operation attribute is the assignment operator
         * it runs calculate() instead.
         */
        $('.btn[data-operation]').on('click', function () {
            if (display !== "") {
                if ($(this).attr('data-operation') !== '=') {
                    updateExpression(display, $(this).attr('data-operation'));
                } else {
                    calculate();
                }
            }
        });

        /**
         * Listens for clicks on elements with the class 'btn-full' and an attribute of
         * 'data-clear'. Resets all variables and update the DOM
         */
        $('.btn-full[data-clear]').on('click', function() {
            clearAll();
        });

        /**
         * Adds the value in the display to the temporary expression,
         * calculates the result and adds it to the display. Sets hasCalculated to true,
         * so adding additional numbers will now reset the display.
         */
        function calculate() {
            expression += display;
            $('#display').html(eval(expression));
            display = eval(expression);
            resetExpression();
            hasCalculated = true;
        }

        /**
         * Updates the data-value of the clicked element to the display.
         * @param value The value to add to the display
         */
        function updateValue(value) {

            if (hasComma && value == '.') {
                return;
            }
            if (!hasComma && value == '.') {
                hasComma = true;
            }

            display += value;
            $('#display').html(display);

        }

        /**
         * Updates the current expression with the entered value and operator.
         * @param value The value to add to the expression.
         * @param operation The operation to add to the expression.
         */
        function updateExpression(value, operation) {
            if (display.substr(display.length -1) !== '.') {
                expression += value + operation;
                $('#expression').html(expression);
                resetDisplay();
                hasComma = false;
            }
        }

        /**
         * Resets the display.
         */
        function resetDisplay() {
            display = "";
            $('#display').html(display);
        }

        /**
         * Resets the expression.
         */
        function resetExpression() {
            expression = "";
            $('#expression').html(expression);
        }

        /**
         * Resets all variables and update the DOM
         */
        function clearAll() {
            resetDisplay();
            resetExpression();
            hasCalculated = false;
            hasComma = false;
        }

    });
})
(jQuery);

