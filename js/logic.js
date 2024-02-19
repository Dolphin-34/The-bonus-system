function calculate() {
    // Функция, которая переводит бонус из процентов в рубли.
    const calculateBonusRub = (bonusPercentage) => Math.round(baseRate * (bonusPercentage / 100)) // 

    // Функция, которая считает бонус при кол-во проведённых занятий.
    const calculateBonus = (lessons) => {
        if (lessons < 16) {
            return 0;
        } else if (lessons < 32) {
            return 5;
        } else if (lessons < 64) {
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

    let steps = [16, 32, 64]; // Этапы бонусов.
    let bonuses = [5, 7, 10];
    let nextStep = steps.find(s => allLessons < s) || 100;
    let nextDelta = nextStep - allLessons;
    let nextNewStep = steps.find(s => newLessons < s) || 100;
    let nextNewDelta = nextNewStep - newLessons;

    // Подсчитаем уроки, что будут в новом и старом ЛК.
    let nextNewLessons = nextStep - oldLessons;
    if (nextNewDelta < 0) { 
        nextNewLessons = nextNewStep;
    } else if (nextDelta < 0) {
        nextNewLessons = nextNewStep;
    } else if (nextDelta > nextNewDelta) {
        nextNewLessons = nextNewStep;    //
    }
    
    let nextAllLessons = oldLessons + nextNewLessons;
    
    // Рассчитаем бонусы и ставку.
    let nextBonus = calculateBonus(nextAllLessons+1);
    let nextBonusRub = calculateBonusRub(nextBonus);
    let nextNewBonus = calculateBonus(nextNewLessons+1);
    let nextNewBonusRub = calculateBonusRub(nextNewBonus);
    // let nextRate = baseRate + Math.abs(nextBonusRub - nextNewBonusRub);
    let nextRate = nextNewLessons >= 64 ? baseRate : baseRate + Math.abs(nextBonusRub - nextNewBonusRub);
 
    document.getElementById('allLessons').innerText = ` ${allLessons}`;
    document.getElementById('newBonus').innerText = ` ${newBonus}% (${newBonusRub} руб.)`;
    document.getElementById('resultBonus').innerText = ` ${resultBonus}% (${resultBonusRub} руб.)`;
    document.getElementById('newRate').innerText = ` ${newRate} руб.`;
    document.getElementById('resultRate').innerText = ` ${resultRate} руб.`;
    document.getElementById('nextNewLessons').innerText = ` ${nextNewLessons}`;
    document.getElementById('nextRate').innerText = ` ${nextRate} руб.`;
}


