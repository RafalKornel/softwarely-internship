import React from "react";

const ExplanationEn = () => (
    <section>
        <h1>Explanation</h1>
        <p>This is my solution for Softwarely front-end internship recruitment task. The problem was to create accordion-like list, that would be fed data from JSON format, had to manage arbitrary number of nesting, and implement two types of cards: checkboxes and radios. The behaviour is same as HTML's radio/checkbox input, but with small difference, in this app you can uncheck (close) radio button.</p>
        <p>The JSON file structure is as follows: <br />
        <code>
            {"{"} <br />
                <span /> "name": {"<"} string {">"} Will be shown in header.<br />
                <span /> "type": {"<"} "radio" | "checkbox" | none {">"} Determines type of card. If ommited, will use name as header and only show message. <br />
                <span /> "subNodes": {"<"} array {">"} Contains all child nodes, which are the same shape as parent.<br />
             {"{"} <br />
        </code>
            It contains only 3 fields: name, type and list of inner elements. This scructure 
            allows to easily create very complex list. </p>

        <p> The code has beed writte in Javascript, with React library. It helped with DOM manipulation (adding, removing elements)</p>
        <p> Considering data format, the list is created recursively. Code contains two components, Tree (which is a wrapper for whole list), and Node.</p>
        <p> The second one recursively renders data inside itself, from JSON file. Considering specification of problem, components use
            state contained in original DOM tree. </p>
        <p> Because of this, it was easier to mainain state of components. It could be problematic otherwise, because components are recursive, and in order to recreate radio input behaviour,
            the state would need to be lifted to common parent. This solution would add more complexity to code. Instead, "name" attribute of HTML element "input" was used, recreating radio input behaviour. </p>
        <p> In order to provide full functionality (hiding radio cards), Node component has "checked" field, which is updated (synchronised) with DOM value every time tree updates.
            This, again is not really proper way of solving problem in React, but it did it's job. </p>
        <p> React refreshes components only upon change of props or state. Neither of those were changing in solution, thus Tree component refreshes whole tree of nodes upon every click. This was 
            achieved thanks to forceUpdate lifecycle method. </p>
        <p> Storing state in DOM is not "React way", but usage of this pattern is justified in current context. React rule, one source of truth, was preserved.</p>

    </section>
);

const ExplanationPl = () => (
    <section>
        <h1>Wyjaśnienie</h1>
        <p>Po lewej stronie znajduje się moje rozwiązanie zadania rekrutacyjnego na stanowisko intern front-end developera. Zadanie polegało na stworzeniu rozwijanej listy, o dowolnej głębokości, z dwoma rodzajami przycisków: radio oraz checkbox. Zachowanie przycisków jest analogiczne do elementów *input* typy radio oraz checkbox, z tą różnicą, że w moim rozwiązaniu przycisk radio da się oznaczyć (zamknąć). Lista powstaje w opraciu o plik JSON.</p>
        <p>Format pliku JSON jest następujący: <br />
        <code>
            {"{"} <br />
                <span /> "name": {"<"} string {">"} Tekst wyświetlony w nagłówku karty.<br />
                <span /> "type": {"<"} "radio" | "checkbox" | none {">"} Typ komponentu. Pominięcie stworzy nieklikalny element (tekst)"<br />
                <span /> "subNodes": {"<"} array {">"} Zawiera wszystkie zagnieżdzone elementy. <br />
             {"{"} <br />
        </code>
        Zawiera on jedynie 3 pola: nazwę, typ oraz listę wewnętrznych elementów.
        Taka struktura pozwala z łatwy sposób stworzyć złożoną listę.
        </p>

        <p> Kod został napisany w Javascripcie, z wykorzystaniem biblioteki React. Ułatwiła ona znacznie manipulowaniem DOM'em. </p>
        <p> Z uwagi na rodzaj danych wejściowych, lista jest tworzona rekurencyjnie. W kodzie znajdują się dwa komponenty, Tree (który jest tylko "wrapperem" na listę), oraz Node. </p>
        <p> Ten drugi rekurencyjnie renderuje wewnątrz siebie dane z pliku JSON. Z uwagi na specyfikacje problemu, komponenty wykorzystują stan przechowywany w oryginalnym drzewie DOM. </p>
        <p> Dzięki temu uniknięto problemu zarządzania stanem każdego komponentu. Mogłoby to być problematyczne, ponieważ komponenty są rekurencyjne, a żeby odtworzyć działanie radio input'u, należy
            podnieść stan do wspólnego komponentu. Rozwiązanie to, jakkolwiek poprawne, dodałoby złożoności aplikacji.
            Zamiast tego wykorzystano atrybut "name" elementu HTML "input".  </p>
        <p> Aby zapewnić pełną funkcjonalność (zamykanie kart typu radio), komponent Node zawiera pole "checked", które jest aktualizowane za każdym odświeżeniem drzewa.</p>
        <p> React odświeża komponenty jedynie przy zmianie props'ów, lub stanu. Ponieważ w rozwiązaniu żadne z dwóch się nie zmienia (stan trzymany jest 
            przez DOM), komponent Tree przy każdym kliknięciu odświeża całe drzewo. Dokonano to za pomocą funkcji cyklu życia forceUpdate. </p>
        <p> Przechowywanie stanu w DOM'ie nie jest zgodne z filozofią Reacta, jednak wykorzystanie tego schematu jest usprawieliwione w tym przypadku, także zostały 
            zachowane inne zasady Reacta (jedno źródło prawdy) </p>
    </section>
)

class Explanation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            en: true,
        }

        this.switch = this.switch.bind(this);
    }

    switch() {
        this.setState(state => ({en: !state.en}) );
    }

    render() {
        return(
            <>
                <input
                    type="button" 
                    value={ this.state.en ? "PL" : "EN" } 
                    onClick={this.switch}
                    className="langSwitch" />
                { this.state.en
                  ? <ExplanationEn />
                  : <ExplanationPl /> }
            </>
        );
    }
}

export default Explanation;