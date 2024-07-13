document.addEventListener('DOMContentLoaded', () => {
	// Dom elementleri
	const keptButton = document.querySelector('.kept');
	const againButton = document.querySelector('.again');
	const guessInput = document.querySelector('.guess');
	const enterButton = document.querySelector('.btn.keep');
	const languageButton = document.querySelector('.language');
	const message = document.querySelector('.message');
	const numberButtons = document.querySelectorAll('.number2');
	const stepButtons = document.querySelectorAll('.step');
	const stepsDiv = document.getElementById('steps');
	const numberDiv = document.querySelector('.number');
	const body = document.querySelector('body');

	let chosenNumber;
	let isTurkish = false;

	// Fonksiyon amelelikleri
	function translateText() {
		if (isTurkish) {
			document.querySelector('.title').textContent = 'Sayımı Tahmin Et!';
			document.querySelector('.title2').textContent = 'Öncelikle. Bir sayı tut 💫';
			keptButton.textContent = 'Tuttum!';
			againButton.textContent = 'Yeniden!';
			enterButton.textContent = 'Girin!';
			message.textContent = 'Aklında bir sayı tut';
			stepButtons[0].previousElementSibling.textContent = 'Adım 1: Aklından tutuğun sayı ile seçtiğin sayıyı topla';
			stepButtons[0].textContent = 'Tamam';
			stepButtons[1].previousElementSibling.textContent = 'Adım 2: Çıkan sonucu 2 ile çarp';
			stepButtons[1].textContent = 'Tamam';
			stepButtons[2].previousElementSibling.textContent = 'Adım 3: Çarptığın sayıya 16 ekle';
			stepButtons[2].textContent = 'Tamam';
			stepButtons[3].previousElementSibling.textContent = 'Adım 4: Çıkan sonucu 2 ile çarp';
			stepButtons[3].textContent = 'Tamam';
			stepButtons[4].previousElementSibling.textContent = 'Adım 5: Çıkan sonucu 4\'e böl';
			stepButtons[4].textContent = 'Tamam';
			stepButtons[5].previousElementSibling.textContent = 'Adım 6: Çıkan sonucu yaz';
			stepButtons[5].textContent = 'Tamam';
		} else {
			document.querySelector('.title').textContent = 'Guess My Number!';
			document.querySelector('.title2').textContent = 'Firstly. Keep a number in mind 💫';
			keptButton.textContent = 'I kept!';
			againButton.textContent = 'Again!';
			enterButton.textContent = 'Enter!';
			message.textContent = 'Keep a number in your mind';
			stepButtons[0].previousElementSibling.textContent = 'Step 1: Add your chosen number to the number you picked';
			stepButtons[0].textContent = 'Done';
			stepButtons[1].previousElementSibling.textContent = 'Step 2: Multiply the result by 2';
			stepButtons[1].textContent = 'Done';
			stepButtons[2].previousElementSibling.textContent = 'Step 3: Add 16 to the result';
			stepButtons[2].textContent = 'Done';
			stepButtons[3].previousElementSibling.textContent = 'Step 4: Multiply the result by 2';
			stepButtons[3].textContent = 'Done';
			stepButtons[4].previousElementSibling.textContent = 'Step 5: Divide the result by 4';
			stepButtons[4].textContent = 'Done';
			stepButtons[5].previousElementSibling.textContent = 'Step 6: Enter the result';
			stepButtons[5].textContent = 'Done';
		}
	}

	// Dil seçeneği
	languageButton.addEventListener('click', () => {
		isTurkish = !isTurkish;
		translateText();
	});

	// Aklında tutunca tıklanan butonun özellikleri
	keptButton.addEventListener('click', () => {
		message.textContent = isTurkish ? 'Seçeneklerden bir sayı seçin' : 'Select a number from the options';
		const randomNumbers = generateRandomNumbers(3); //3 rastgele sayı
		numberButtons.forEach((button, index) => {
			button.textContent = randomNumbers[index];
			button.style.display = 'inline-block';
		});
	});

	// Sayı butonu
	numberButtons.forEach(button => {
		button.addEventListener('click', () => {
			chosenNumber = parseInt(button.textContent); // Seçilen sayıyı tutan değişken
			message.textContent = isTurkish ? 'Şimdi işlemleri yapın ve sonucu girin' : 'Now perform the operations and enter the final result'; // Mesaj güncelleme
			numberButtons.forEach(button => button.style.display = 'none'); // Sayıların gizlenmesi
			stepsDiv.style.display = 'block'; // Adımları göster
		});
	});

	// Adım butonunun işleyişi
	stepButtons.forEach(button => {
		button.addEventListener('click', () => {
			const step = parseInt(button.dataset.step);
			if (step < stepButtons.length) {
				button.style.display = 'none';
				stepButtons[step].previousElementSibling.style.display = 'block';
				stepButtons[step].style.display = 'inline-block';
			}
		});
	});

	// Enter butonu 
	enterButton.addEventListener('click', () => {
		let finalResult = parseInt(guessInput.value); // Çıkan sonucu alır (int)
		if (!isNaN(finalResult)) { // Girilen sayının sayı olup olmadığını kontrol eder
			let originalNumber = (finalResult - chosenNumber - 8); // Hesaplamalar
			message.textContent = isTurkish ? `Düşündüğünüz sayı: ${originalNumber}` : `The number you were thinking of is: ${originalNumber}`; // Sonucu gösterir
			numberDiv.textContent = originalNumber;
			body.style.backgroundColor = '#60b347'; // Arka plan rengini değiştirir.
		}
	});

	//Reset tuşuna click özelliği atar
	againButton.addEventListener('click', () => {
		resetGame();
	});


	function generateRandomNumbers(count) {
		let numbers = [];
		for (let i = 0; i < count; i++) {
			numbers.push(Math.floor(Math.random() * 100) + 1); // 1-100 arası rastgele sayı
		}
		return numbers;
	}

	// Sıfırlama fonksiyonu
	function resetGame() {
		guessInput.value = ''; // 
		message.textContent = isTurkish ? 'Aklında bir sayı tut' : 'Keep a number in your mind';
		numberButtons.forEach(button => button.style.display = 'none');
		stepsDiv.style.display = 'none'; //Adımları sıfırlar
		stepButtons.forEach(button => button.style.display = 'none');
		stepButtons[0].previousElementSibling.style.display = 'block';
		stepButtons[0].style.display = 'inline-block';
		numberDiv.textContent = '?';
		body.style.backgroundColor = '#222';
	}

	// Oyunu sıfırlama fonksiyonunu çağırır
	resetGame();
});
