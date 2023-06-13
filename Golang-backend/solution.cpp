#include <iostream>

int main() {
    int arr[10000000] = {1, 2, 3, 4, 5};

    // Print the elements of the array
    for (int i = 0; i < 5; i++) {
        std::cout << arr[i] << " ";
    }
    std::cout << std::endl;

    return 0;
}