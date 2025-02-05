import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { HiOutlineHeart, HiHeart } from 'react-icons/hi';
import { PlcardProps } from 'src/types/Slider';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Taplist() {
    const [pldata, setPldata] = useState<PlcardProps[]>([]); //플리데이터 저장 스테이트
    const [currentPage, setCurrentPage] = useState<number>(1); // 현재 페이지
    const [totalPages, setTotalPages] = useState<number>(0); // 전체 페이지 수
    const buttonArray = [];

    useEffect(() => {
        axios
            .get(
                `http://ec2-52-78-105-114.ap-northeast-2.compute.amazonaws.com:8080/playlists?page=${currentPage}&size=5`,
            )
            .then(function (response) {
                // 성공적으로 요청을 보낸 경우
                // console.log(response.data.pageInfo.totalPages);
                setPldata(response.data.data);
                setTotalPages(response.data.pageInfo.totalPages);
            })
            .catch(function (error) {
                // 요청 중에 오류가 발생한 경우
                console.error(error);
            });
    }, [currentPage]);

    /** 2023.05.17 전체 페이지 수 만큼 버튼 생성 - 김주비*/
    for (let i = 1; i <= totalPages; i++) {
        buttonArray.push(
            <button
                key={i}
                className={i === currentPage ? 'page-focused' : ''}
                onClick={() => {
                    setCurrentPage(i);
                }}
            >
                {i}
            </button>,
        );
    }
    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };
    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    return (
        <TapGroup>
            <Plsearch placeholder="제목을 검색해주세요" />
            <ul>
                {pldata.map((data) => (
                    <TapList key={data.playListId}>
                        <div>
                            <img src="/" alt="playlist cover image" />
                        </div>
                        <div className="pl-title">
                            <p>
                                <Link to={`/playlsit/${data.playListId}`}>{data.title.slice(0, 20)}</Link>
                            </p>
                            <p>{data.createMember}</p>
                        </div>
                        <ul className="pl-tag">
                            {/* {data.tag.slice(0, 2).map((tag, i) => (
                                <li key={`tag-${i}`}>{tag.tagname}</li>
                            ))} */}
                        </ul>
                        <div className="pl-like">
                            <Like />
                            <span>503</span>
                        </div>
                    </TapList>
                ))}
            </ul>
            <Pagination>
                <button disabled={currentPage === 1} onClick={handlePrevPage}>
                    Prev
                </button>
                {buttonArray}
                <button disabled={currentPage === totalPages} onClick={handleNextPage}>
                    Next
                </button>
            </Pagination>
        </TapGroup>
    );
}

function Like() {
    const [like, setLike] = useState<boolean>(false);
    return (
        <>
            {like ? (
                <HiHeart
                    onClick={() => {
                        setLike(!like);
                    }}
                />
            ) : (
                <HiOutlineHeart
                    onClick={() => {
                        setLike(!like);
                    }}
                />
            )}
        </>
    );
}

export default Taplist;

const TapGroup = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    ul {
        width: 60%;
        display: flex;
        justify-content: center;
        align-content: center;
        flex-wrap: wrap;
    }
    @media (max-width: 700px) {
        ul {
            width: 90%;
        }
    }
`;
/**2023-05-06 펼쳐지는 서치바 애니메이션 : 김주비*/
const Plsearch = styled.input`
    border-radius: 30px;
    width: 0%;
    background: rgb(255, 255, 255, 0.2);
    animation: showinput 1s forwards;
    opacity: 0;
    margin-top: -30px;

    ::placeholder {
        color: #969696;
        font-family: 'Rajdhani', sans-serif;
    }
    @keyframes showinput {
        100% {
            opacity: 1;
            width: 300px;
            padding: 10px 30px;
            border: 2px solid #b1b1b1;
            color: #dddddd;
            outline: none;
            border-radius: 30px;
            margin-bottom: 30px;
        }
    }
    @media (max-width: 700px) {
        transform: scale(0.8);
    }
`;
const TapList = styled.li`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70%;
    background-color: rgba(0, 0, 0, 0.5);
    border: 1px solid #494949;
    border-radius: 50px;
    opacity: 0;
    animation: opacity 1s forwards;
    margin-top: 10px;
    transition: 0.3s ease-in-out;

    :hover {
        transform: scale(1.05);
        background-color: rgba(20, 20, 20, 0.5);
    }

    > div img {
        margin: 10px;
        border-radius: 50px;
        transition: 0.2s ease-in-out;
        width: 40px;
        height: 40px;
        background-size: cover;
    }

    .pl-title {
        display: flex;
        width: 100%;
    }
    .pl-title p:nth-child(1) {
        font-weight: 600;
    }
    .pl-title p:nth-child(2) {
        color: #666;
        margin: 0px 10px;
    }
    .pl-title a {
        color: #ccc;
        text-decoration: none;
    }

    .pl-tag {
        display: flex;
        flex-direction: row;
        justify-content: right;
        align-items: center;
    }
    .pl-tag li {
        border: 2px solid #ccc;
        padding: 5px 10px;
        border-radius: 50px;
        font-size: 12px;
        opacity: 0.5;
        transform: scale(0.8);
    }
    .pl-like {
        display: flex;
        justify-content: center;
        align-items: center;
        min-width: 100px;
        color: rgba(199, 68, 68, 1);
    }
    @keyframes opacity {
        100% {
            opacity: 1;
        }
    }

    @media (max-width: 1350px) {
        .pl-title p:nth-child(2) {
            display: none;
        }
        .pl-like {
            min-width: 50px;
            font-size: 20px;
        }
        .pl-like span {
            display: none;
        }
    }
    @media (max-width: 1100px) {
        .pl-tag {
            display: none;
        }
    }

    @media (max-width: 700px) {
        width: 100%;
    }
`;

const Pagination = styled.div`
    button {
        color: #ccc;
        background: none;
        border: 1px solid #5a5a5a;
        border-radius: 3px;
        margin: 40px 3px;
        transition: 0.2s ease-in-out;
        cursor: pointer;
    }
    button:hover {
        color: #ccc;
        border-color: #ccc;
        background: rgba(255, 255, 255, 0.2);
    }

    button:disabled {
        border: 1px solid #5a5a5a;
        color: #5a5a5a;
    }
    button:disabled:hover {
        background: none;
        cursor: default;
    }

    .page-focused {
        color: #ccc;
        border-color: #ccc;
        background: rgba(255, 255, 255, 0.2);
    }
`;
