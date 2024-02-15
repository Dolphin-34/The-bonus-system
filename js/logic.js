function calculate() {
    // Функция, которая переводит бонус из процентов в рубли.
    const calculateBonusRub = (bonusPercentage) => Math.round(baseRate * (bonusPercentage / 100)) // 

    // Функция, которая считает бонус при кол-во проведённых занятий.
    const calculateBonus = (lessons) => {
        if (lessons < 17) {
            return 0;
        } else if (lessons < 33) {
            return 5;
        } else if (lessons < 65) {
            return 7;
        } else {
            return 10
        }
    }

    // Кол-во проведённых занятий в старом, новой ЛК, а также общее кол-во
    let oldLessons = parseInt(document.getElementById('oldLessons').value);
    let newLessons = parseInt(document.getElementById('newLessons').value);
    const allLessons = oldLessons + newLessons;

    // Базовая ставка репетитора без бонуса
    const baseRate = parseInt(document.getElementById('baseRate').value);


    // Бонус (в % и руб.) и ставка, что платится в новом ЛК
    let newBonus;
    let newBonusRub;
    let newRate; 

    // Итоговый бонус (в % и руб.) и ставка, что нужно платить репетитору
    let resultBonus;
    let resultBonusRub;
    let resultRate; 

    // Считаем, какой на данный момент платит бонус система в новом ЛК
    newBonus = calculateBonus(newLessons)

    // Считаем, какой бонус должен быть с учетом проведённых уроков во всех ЛК
    resultBonus = calculateBonus(allLessons)

    // Переводим бонус в новом ЛК в рубли
    newBonusRub = calculateBonusRub(newBonus);

    // Считаем новый бонус в рублях и новую ставку репетитора
    resultBonusRub = calculateBonusRub(resultBonus);
    newRate = baseRate + resultBonusRub;
    resultRate = newRate - newBonusRub;

    // Cчитаем, при каком кол-во занятий в новом ЛК нужно сменить ставку и будущю ставку
    const nextBonusThresholds = [16, 32, 64];
    const bonusPercentages = [5, 7, 10];
    let nextAllLessons = allLessons;
    let nextNewLessons = newLessons;
    let nextRate;

    for (i = 0; i < nextBonusThresholds.length; i++) {
        const thresholds = nextBonusThresholds[i];
        let nextBaseRate

        while (nextAllLessons < thresholds) {
            nextNewLessons++;
            nextAllLessons = oldLessons + nextNewLessons;
        }

        if (nextAllLessons === thresholds) {
            const nextBonusPercentage = bonusPercentages[i];
            const nextBonusRub = calculateBonusRub(nextBonusPercentage);
            nextBaseRate = baseRate + nextBonusRub;
            nextRate = nextBaseRate - newBonusRub;
            break;
        }
        
        if (nextAllLessons >= nextBonusThresholds[nextBonusThresholds.length - 1]) {
            nextNewLessons = 64;
        }

        if (!nextRate) {
            nextRate = baseRate;
        }
    }

    document.getElementById('allLessons').innerText = ` ${allLessons}`;
    document.getElementById('newBonus').innerText = ` ${newBonus}%`;
    document.getElementById('resultBonus').innerText = ` ${resultBonus}%`;
    document.getElementById('newRate').innerText = ` ${newRate} руб.`;
    document.getElementById('resultRate').innerText = ` ${resultRate} руб.`;
    document.getElementById('nextNewLessons').innerText = ` ${nextNewLessons}`;
    document.getElementById('nextRate').innerText = ` ${nextRate} руб.`;
}


