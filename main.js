document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const numbersDisplay = document.getElementById('numbers-display');

    const getBallColor = (number) => {
        if (number <= 10) return 'var(--ball-color-1)';
        if (number <= 20) return 'var(--ball-color-2)';
        if (number <= 30) return 'var(--ball-color-3)';
        if (number <= 40) return 'var(--ball-color-4)';
        return 'var(--ball-color-5)';
    };

    const generateLottoNumbers = () => {
        // 1. 이전 번호를 지웁니다.
        numbersDisplay.innerHTML = '';
        numbersDisplay.classList.add('generating');

        // 2. 6개의 고유한 번호를 생성합니다.
        const numbers = new Set();
        while (numbers.size < 6) {
            const randomNumber = Math.floor(Math.random() * 45) + 1;
            numbers.add(randomNumber);
        }

        // 3. 번호를 정렬하고 화면에 표시합니다.
        const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);
        
        sortedNumbers.forEach((number, index) => {
            setTimeout(() => {
                const ball = document.createElement('div');
                ball.className = 'number-ball';
                ball.textContent = number;
                ball.style.backgroundColor = getBallColor(number);
                ball.style.animationDelay = `${index * 100}ms`;
                numbersDisplay.appendChild(ball);
            }, index * 120); // 애니메이션을 순차적으로 적용합니다.
        });
        
        numbersDisplay.classList.remove('generating');
    };

    generateBtn.addEventListener('click', generateLottoNumbers);
});
