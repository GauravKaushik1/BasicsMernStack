import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaArrowUp } from 'react-icons/fa';

export const BackToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    const handleScroll = () => {
        setIsVisible(window.scrollY > 20);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollUp = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        isVisible && (
            <Wrapper>
                <button className="top-btn" onClick={scrollUp}>
                    <FaArrowUp className="top-btn--icon" />
                </button>
            </Wrapper>
        )
    );
};

const Wrapper = styled.section`
  .top-btn {
    font-size: 2.4rem;
    width: 6rem;
    height: 6rem;
    color: #fff;
    background-color: var(--btn-color); /* Ensure this variable is defined in your CSS */
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    position: fixed;
    bottom: 5rem;
    right: 5rem;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: background-color 0.2s, box-shadow 0.2s;

    &--icon {
      animation: gototop 1.2s linear infinite alternate-reverse;
    }

    &:hover {
      background-color: var(--hover-color); /* Ensure this variable is defined in your CSS */
    }

    @keyframes gototop {
      0% {
        transform: translateY(-0.5rem);
      }
      100% {
        transform: translateY(1rem);
      }
    }
  }

  @media (max-width: 768px) {
    .top-btn {
      right: 1rem;
      left: auto;
    }
  }
`;