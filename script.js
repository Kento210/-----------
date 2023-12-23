document.addEventListener('DOMContentLoaded', function() {
    fetch('data.csv')
        .then(response => response.text())
        .then(text => {
            const data = parseCSV(text);
            data.sort((a, b) => a.score - b.score); // 点数が低い順にソート
            displayRanking(data);
        })
        .catch(error => console.error('エラー:', error));
});

// CSVデータを解析する関数
function parseCSV(csv) {
    const lines = csv.split('\n');
    return lines.map(line => {
        const [nickname, score] = line.split(',');
        return { nickname, score: parseInt(score, 10) };
    });
}

// ランキングを表示する関数
function displayRanking(data) {
    const rankingDiv = document.getElementById('ranking');
    rankingDiv.innerHTML = ''; // 既存の内容をクリア
    data.forEach((item, index) => {
        const entryDiv = document.createElement('div');
        entryDiv.textContent = `${index + 1}. ${item.nickname} - ${item.score}点`;
        rankingDiv.appendChild(entryDiv);
    });
}