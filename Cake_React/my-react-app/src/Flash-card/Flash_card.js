import React, { useEffect, useRef, useState } from 'react';

import Login from '../Login/Login';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
//import { Link } from 'react-router-dom';
import Lenis from '@studio-freight/lenis';
import './style.css';

function FlashCard() {
    const [currentCard, setCurrentCard] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);

    const cards = [
        { question: 'Cow', answer: 'con bò' },
        // Add more cards here
    ];

    const handleNext = () => {
        if (currentCard < cards.length - 1) {
            setCurrentCard(currentCard + 1);
        } else {
            setCurrentCard(0);
        }
        setShowAnswer(false);
    };

    const handlePrev = () => {
        if (currentCard > 0) {
            setCurrentCard(currentCard - 1);
        } else {
            setCurrentCard(cards.length - 1);
        }
        setShowAnswer(false);
    };

    const toggleAnswer = () => {
        setShowAnswer(!showAnswer);
    };

    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const [currentCardIndex, setCurrentCardIndex] = useState(0);

    const nextCard = () => {
        setCurrentCardIndex((prevIndex) => (prevIndex + 1) % cards.length);
    };

    const previousCard = () => {
        setCurrentCardIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
    };

    return (
        <div>
            <div className="navigation">
            <div className="navigation__logo">
                <img src="img/cake-logo-small.png" alt="Cake Logo" className="navigation__logo-img" />
                <div className="navigation__brand">Cake</div>
            </div>

            <div className="navigation__search-box">
                <svg className='navigation__search-box-icon' xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 32 32">
                    {/* SVG Path */}
                </svg>
                <input className="navigation__search-box-bar" type="text" placeholder="Search for folders, tutor,.." />
            </div>

            <ul className="navigation__link">
                <div className="navigation__dropdown">
                    <button onClick={toggleDropdown}>
                        <span>Your library</span>
                        {/* SVG for dropdown arrow */}
                    </button>
                    {isDropdownOpen && (
                        <ul className="navigation__dropdown-list">
                            <div className="navigation__dropdown-button-container">
                                <button className="navigation__dropdown-button">Flash-slices</button>
                                <button className="navigation__dropdown-button">Quick-bites</button>
                            </div>
                            <div className="navigation__dropdown-item-container">
                                {/* List of dropdown items */}
                            </div>
                            <a className="navigation__dropdown-all" href="#">All</a>
                        </ul>
                    )}
                </div>

                <li className="navigation__link-btn"><a className='navigation__link-btn-a' href='#'>Help Center</a></li>
                <li className="navigation__link-btn"><a className='navigation__link-btn-a' href='#'>Language: VN</a></li>
                <img className='navigation__avatar' src="img/avatar2.png" alt="" />
            </ul>
        </div>


        <section className="main">
            <div className="study__top">
                <h1 className="study__header">Animals</h1>
                <img src="img/orange.png" alt="" className="study__cake" />
                {/* SVG icons can be included directly */}
            </div>

            <div className="study__stats">
                <h6 className="study__stat">30 have enrolled</h6>
                <h6 className="study__stat">5.0 (3rate)</h6>
            </div>

            <div className="quiz">
                <div className="quiz__title">
                    <div className="quiz__card">
                        <div className={`card__side ${currentCardIndex % 2 === 0 ? 'card__side--front' : 'card__side--back'}`}>
                            <h1>{cards[currentCardIndex].title}</h1>
                        </div>
                        <div className={`card__side ${currentCardIndex % 2 !== 0 ? 'card__side--front' : 'card__side--back'}`}>
                            <h1>{cards[currentCardIndex].answer}</h1>
                        </div>
                    </div>
                    <button onClick={previousCard}>Previous</button>
                    <span>{currentCardIndex + 1}/{cards.length}</span>
                    <button onClick={nextCard}>Next</button>
                </div>
            </div>

            <div className="author">
                <img src="img/avatar1.png" alt="" className="author__avt" />
                <div className="avt__name">anhlenguyen</div>
                <div className="author__time">created in March 13rd 2024</div>
            </div>

            <h1 className="quizzes__header">Cards List</h1>
            <ul className="quizzes__list">
                {cards.map((card, index) => (
                    <li key={index} className="quizzes__item">
                        <div className="quizzes__title">{card.title}</div>
                        <div className="quizzes__answer">{card.answer}</div>
                    </li>
                ))}
            </ul>
        </section>

        <footer className="footer">
            <div className="footer__img-container">
                <img src="img/cake-logo-big.png" alt="Cake Logo" className="footer__logo" />
                <h1 className="footer__brand">CAKE</h1>
            </div>
            <div className="footer__text-container">
                <h3 className="footer__h3-author">Author</h3>
                <h4 className="footer__h4-author-1">minh</h4>
                <h4 className="footer__h4-author-2">minh</h4>
                <h4 className="footer__h4-author-3">minh</h4>
                <h4 className="footer__h4-author-4">nam</h4>
                <h3 className="footer__h3-about">About CAKE</h3>
                <h4 className="footer__h4-about-1">How CAKE works</h4>
                <h4 className="footer__h4-about-2">Q&A</h4>
                <h3 className="footer__h3-term-of-use">Terms of Use</h3>
                <h4 className="footer__h4-term-of-use">Terms & Privacy</h4>
            </div>
            <div className="footer__text-container-1">
                <h3 className="footer__h3-acknowledge">University Acknowledgement</h3>
                <h4 className="footer__h4-acknowledge">A project for Hanoi University of Science and Technology's Web Subject Course</h4>
            </div>
        </footer>
        </div>
    );
}

export default FlashCard;
