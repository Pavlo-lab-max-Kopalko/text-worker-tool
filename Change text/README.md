   # Getting Started:

  1.  **Clone the repository and enter to the app:**
    ```git clone https://github.com/Pavlo-lab-max-Kopalko/text-worker-tool.git```
    ```code text-worker-tool```
    ```cd Middle-PHP/Change text```
  2.  **Install dependencies:**
    ```npm install```
  3. **Go to live**
    ```npm run dev```
  4.  **Open the link as this:**
     (http://localhost:5173/)
    (The application will typically open in your browser).

    Привіт. Дякую за таке цікаве та творче тестове завдання! Я реалізував більшу частину інтерфейсу окрім заміни рядка та сортування. Для запису та повернення історії я реалізував два стани: в одному я записував всі кроки які здійснив користувач (hisory), в іншому індекс котрий відображає поточний елемент в історії змін який зараз користувач переглядає (currentIndex). Наприклад, користувач переглядає третій елемент в історії з 10, тому в другий стан матиме значення 2: setText(hisory[currentIndex]);
    Для того, щоб інтерфейс не зависав мені я використав Web Worker котрий створює другий потік даних і інтерфейс користувача не зависає під час обчислень.
