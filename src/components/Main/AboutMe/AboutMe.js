import "./AboutMe.css";
import author from "../../../images/photo_author.jpg";
import TitleSection from "../../TitleSection/TitleSection";
import Portfolio from "../Portfolio/Portfolio";

function AboutMe() {
    // Вычисляем возраст
    function calculateAge() {
        const birthDate = new Date(1977, 7, 5);
        const todayDate = new Date();
        const addOne =
            todayDate.getMonth() - birthDate.getMonth() >= 0 &&
            todayDate.getDate() - birthDate.getDate() >= 0;
        const diff = todayDate.getFullYear() - birthDate.getFullYear();
        const age = diff - 1 + (addOne ? 1 : 0);
        let yearsWord = 'лет';
        if (age % 10 === 1 && age % 100 !== 11) {
            yearsWord = 'год';
        } else if (age % 10 >= 2 && age % 10 <= 4 && (age % 100 < 10 || age % 100 >= 20)) {
            yearsWord = 'года';
        }
        return `${age} ${yearsWord}`;
    }

    return (
        <section className="about-me">
            <TitleSection title="Студент" />
            <article className="about-me__bio">
                <h3 className="about-me__name">Леонид</h3>
                <p className="about-me__profession">
                    Фронтенд-разработчик, {calculateAge()}
                </p>
                <p className="about-me__text">
                    Я&nbsp;родом из&nbsp;Москвы. В&nbsp;далеком 1997 году я&nbsp;закончил Московский Автомобильно-
                    Дорожный колледж. С&nbsp;тех пор
                    много где учился, служил и&nbsp;работал, но&nbsp;в&nbsp;основном всё, так или иначе, было
                    связано с&nbsp;автомобилями. Последние годы работаю сам на&nbsp;себя автоэлектриком-диагностом.
                    У&nbsp;меня молодая супруга и&nbsp;двое детей&nbsp;&mdash; 5&nbsp;и&nbsp;7&nbsp;лет.
                    Мы&nbsp;очень много путешествуем, с&nbsp;автодомом и&nbsp;без, и&nbsp;по&nbsp;несколько
                    месяцев проводим вдали от&nbsp;дома, поэтому я&nbsp;искал для себя возможность
                    во&nbsp;время путешествий иметь дополнительный доход. Мне показалось хорошей идеей работать
                    удалённо при помощи компьютера и&nbsp;интернета, и&nbsp;поэтому я&nbsp;здесь, осваиваю
                    профессию &laquo;Веб-разработчик&raquo; на&nbsp;курсе от&nbsp;Яндекс Практикум.
                </p>
                <a
                    className="about-me__link hover-link"
                    href="https://github.com/Leops200"
                    target="_blank"
                    rel="noreferrer"
                >
                    Github
                </a>
                <img
                    className="about-me__img"
                    src={author}
                    alt="Фотография разработчика"
                />
            </article>
            <Portfolio />
        </section>
    );
}

export default AboutMe;