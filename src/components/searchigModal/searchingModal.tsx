import React, {useEffect, useRef, useState} from "react";
import "./searchingModal.scss";
import {useAppSelector} from "../../hooks/useAppSelector";
import {v4} from "uuid";
import {useActions} from "../../hooks/useActions";
import {Link} from "react-router-dom";
import FetchService from "../../services/fetchService";
import {SearchResult} from "../../types/SearchResult";
import Color from "../../types/Color";
import {SearchType} from "../../types/SearchType";

const SearchingModal: React.FC = () => {

    const {randomColor, isSearchModalOpen} = useAppSelector(state => state.subject);
    const {setIsSearchModalOpen} = useActions();
    const inputRef = useRef<HTMLInputElement>(null);

    const [searchResult, setSearchResult] = useState<SearchResult[]>([]);
    const [searchTime, serSearchTime] = useState<string>("");

    const fetchService = new FetchService();

    const inputStyle = {
        color: randomColor.fontColor
    };

    function closeModalOnClick(): void {
        setIsSearchModalOpen(false);
    }

    const SearchingResult: React.FC<{ name: string, colors: Color, subjectName: string, subjectId: string }> =
        ({
             name,
             subjectId,
             subjectName,
             colors
        }) => {
            return (
                <Link to={`/${subjectName.split(" ").join("")}/${subjectId}`}>
                    <section className="searchingItemSection" onClick={closeModalOnClick} style={
                        {
                            backgroundColor: colors.backgroundColor,
                            color: colors.fontColor
                        }}>
                        {
                            <h3>
                                {
                                    name
                                }
                            </h3>
                        }
                    </section>
                </Link>
            );
        };


    function renderSearchingResult(): React.ReactNode {
        return searchResult.map(result => {
            return <SearchingResult
                name={result.name}
                colors={result.colors}
                subjectName={result.subjectName}
                subjectId={result.subjectId}
                key={v4()}/>;
        });
    }

    async function postSearchQueryOnInputChange(e: React.ChangeEvent<HTMLInputElement>): Promise<void> {
        const body = {
            term: e.target.value,
            searchType: SearchType.bfs
        };

        if (e.target.value !== "" && e.target.value !== " ") {
            const start = performance.now();
            fetchService.postSearchQuery(body)
                .then((res) => setSearchResult(res))
                .then(() => serSearchTime(((performance.now() - start) * 0.001).toFixed(2)));
        } else {
            setSearchResult([]);
        }
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
                <input type="text" placeholder={"Searching..."} style={inputStyle} ref={inputRef}
                       onChange={postSearchQueryOnInputChange}/>
                <div className="searchingResult">
                    {
                        searchResult.length ? renderSearchingResult() : <h4>No results</h4>
                    }
                </div>
                <div className={`searchTime ${searchResult.length ? "": "disable"}`}>
                    <h4 style={inputStyle}>
                        Search time
                    </h4>
                    <h4 style={inputStyle}>
                        {searchTime}s
                    </h4>
                </div>
            </section>
        </>
    );
};

export default SearchingModal;