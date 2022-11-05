import React, {useEffect, useRef} from "react";
import "./searchingModal.scss";
import {useAppSelector} from "../../hooks/useAppSelector";
import Subject from "../../types/Subject";
import {v4} from "uuid";
import {useActions} from "../../hooks/useActions";
import {Link} from "react-router-dom";

const SearchingModal: React.FC = () => {

    const {randomColor, subjects, isSearchModalOpen} = useAppSelector(state => state.subject);
    const {setIsSearchModalOpen} = useActions();
    const inputRef = useRef<HTMLInputElement>(null);

    const inputStyle = {
        color: randomColor.fontColor
    };

    function closeModalOnClick(): void {
        setIsSearchModalOpen(false);
    }

    const SearchingResult: React.FC<{subject: Subject}> = ({subject}) => {
        return (
            <Link to={`/${subject.name.split(" ").join("")}/${subject._id}`}>
                <section className="searchingItemSection" onClick={closeModalOnClick} style={
                    {
                        color: subject.colors.fontColor,
                        backgroundColor: subject.colors.backgroundColor
                    }}>
                    {
                        <h3>
                            {
                                subject.name
                            }
                        </h3>
                    }
                </section>
            </Link>
        );
    };


    function renderSearchingResult(): React.ReactNode {
        return subjects.map(subject => {
            return <SearchingResult subject={subject} key={v4()}/>;
        });
    }

    useEffect(() => {
        if (isSearchModalOpen) {
            if (inputRef.current) inputRef.current.focus();
        } else {
            if (inputRef.current) inputRef.current.blur();
        }
    }, [isSearchModalOpen]);

    return (
        <>
            <section className={"searchingModalSection"}>
                <input type="text" placeholder={"Searching..."} style={inputStyle} ref={inputRef}/>
                <div className="searchingResult">
                    {
                        renderSearchingResult()
                    }
                </div>
            </section>
        </>
    );
};

export default SearchingModal;