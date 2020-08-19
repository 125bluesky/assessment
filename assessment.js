'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');


/**
     * 指定した要素の子どもを全て削除する
     * @param {HTMLElement} element HTMLの要素
     */
function removeAllChildren(element) {
    while (element.firstChild) { //elementに何かタグがあるかぎりループ
        // 子どもの要素があるかぎり削除
        element.removeChild(element.firstChild);
    }
}


const answers = [
    '{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
    '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
    '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
    '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
    '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
    '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
    '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
    '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
    '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
    '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
    '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
    '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
    '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
    '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
    '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
    '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。',
    '{userName}のいいところは優しさです。{userName}の優しい雰囲気や立ち振る舞いに多くの人が癒やされています。'
];


//JSDoc
/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
 */
function assessment(userName) {
    // 全文字のコード番号(漢字だと5桁)を取得してそれを足し合わせる
    let sumOfCharCode = 0;
    for (let i = 0; i < userName.length; i++) {
        sumOfCharCode += userName.charCodeAt(i);
    }

    // 文字のコード番号の合計を回答の数(0~15)で割って添字の数値を求める
    const index = sumOfCharCode % answers.length;
    let result = answers[index];

    // 診断結果
    result = result.replace(/\{userName\}/g, userName);
    return result;
}


/**
 * 指定した要素に診断結果用のタグを設定する。
 * @param {HTMLelement} element HTMLの要素
 */
function appendAssessmentResult(element, result) {
    // result-area に h3 タグで'診断結果'という文字を表示
    const header = document.createElement('h3'); // h3タグを作る
    header.innerText = '診断結果'; // h3タグに'診断結果'の文字列を設定
    element.appendChild(header); // result-area にh3変数を設定

    // result-areaにpタグで診断結果を表示
    const paragraph = document.createElement('p');
    paragraph.innerText = result;
    element.appendChild(paragraph);
}


/**
 * 指定した要素にツイートボタンを設定する。
 * @param {HTMLelement} element HTMLの要素
 * @param {string} message ツイート本文
 */
function appendTweetButton(element, message) {
    //aタグを作って属性を設定する
    const anchor = document.createElement('a');
    const hrefValue =
        'https://twitter.com/intent/tweet?button_hashtag=' +
        encodeURIComponent('あなたのいいところ') +
        '&ref_src=twsrc%5Etfw';
    anchor.setAttribute('href', hrefValue);
    anchor.className = 'twitter-hashtag-button';
    anchor.setAttribute('data-size', 'large');
    anchor.setAttribute('data-text', message);
    anchor.innerText = 'Tweet #あなたのいいところ';
    // aタグをHTMLとして追加
    element.appendChild(anchor);

    // scriptタグを作る
    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    // scriptタグをHTMLとして追加
    element.appendChild(script);
}


assessmentButton.onclick= () => {
    const userName = userNameInput.value;
    if (!userName) {
        // 名前が空の時は処理を終了する
        return;
    }

    // 診断結果表示エリアの作成
    removeAllChildren(resultDivided); //診断結果エリアの初期化
    const result = assessment(userName);
    appendAssessmentResult(resultDivided, result);

    // ツイートエリアの作成
    removeAllChildren(tweetDivided); // Tweetエリアの初期化
    appendTweetButton(tweetDivided, result);
};


// 入力欄でEnterキーを押した時に診断を実行
userNameInput.onkeydown = event => {
    if (event.key === 'Enter') {
        assessmentButton.onclick();
    }
};


// テストコード
console.assert(
    assessment('太郎') === '太郎のいいところは決断力です。次郎がする決断にいつも助けられる人がいます。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
);


console.assert(
    assessment('太郎') === assessment('太郎'), //確認したいこと
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。' //エラー時のコメント
);
