// Function to append a value to the display
function appendValue(value: string): void {
    const display = document.getElementById("display") as HTMLInputElement;
    display.value += value;
}

// Function to clear the display
function clearDisplay(): void {
    const display = document.getElementById("display") as HTMLInputElement;
    display.value = "";
}

// Function to calculate the result
function calculate(): void {
    const display = document.getElementById("display") as HTMLInputElement;
    try {
        // Use eval to evaluate the expression (caution: eval can be unsafe for untrusted input)
        display.value = eval(display.value).toString();
    } catch (error) {
        display.value = "Error";
    }
}