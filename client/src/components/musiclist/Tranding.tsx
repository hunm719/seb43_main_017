import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
// import { atom } from 'recoil';
// import { useRecoilValue } from 'recoil';

/* 2023.05.08 MusicList Tranding 타입 선언 - 홍혜란 */
// interface TrandingData {
//     index: number;
//     albumCover: string;
//     songTitle: string;
//     artistName: string;
// }

// const TrList: TrandingData[] = [
//     {
//         index: 1,
//         albumCover: '/assets/ditto.png',
//         songTitle: 'Ditto',
//         artistName: 'Newjeans',
//     },
//     {
//         index: 2,
//         albumCover: '/assets/ditto.png',
//         songTitle: 'Ditto',
//         artistName: 'Newjeans',
//     },
//     {
//         index: 3,
//         albumCover: '/assets/ditto.png',
//         songTitle: 'Ditto',
//         artistName: 'Newjeans',
//     },
//     {
//         index: 4,
//         albumCover: '/assets/ditto.png',
//         songTitle: 'Ditto',
//         artistName: 'Newjeans',
//     },
//     {
//         index: 5,
//         albumCover: '/assets/ditto.png',
//         songTitle: 'Ditto',
//         artistName: 'Newjeans',
//     },
//     {
//         index: 6,
//         albumCover: '/assets/ditto.png',
//         songTitle: 'Ditto',
//         artistName: 'Newjeans',
//     },
// ];

/* 2023.05.08 MusicList Tranding 상태관리(추후 수정) - 홍혜란 */
// const trListState = atom<TrandingData[]>({
//     key: 'trListState',
//     default: [],
// });
// const trList = useRecoilValue<TrandingData[]>(trListState);

interface MusicData {
    musicId: number;
    musicName: string;
    artistName: string;
    albumName: string;
    musicTime: number; // musicTime 속성을 숫자(number) 타입으로 수정합니다.
    albumCoverImg: string;
    musicUri: string;
    createdAt: string;
    modifiedAt: string;
}

const Trending = () => {
    const [tranding, setTranding] = useState<MusicData[]>([]);
    console.log(tranding);

    useEffect(() => {
        axios
            .get('http://ec2-52-78-105-114.ap-northeast-2.compute.amazonaws.com:8080/musics?&size=6')
            .then((response) => {
                setTranding(response.data.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <Container>
            <TrTitleContainer>
                <TrTitle>Tranding</TrTitle>
            </TrTitleContainer>
            <ItemsContainer>
                {tranding.map((data) => (
                    <Item key={data.musicId}>
                        <Image src={data.albumCoverImg} alt={data.musicName} />
                        <Title>{data.musicName}</Title>
                        <Artist>{data.artistName}</Artist>
                    </Item>
                ))}
            </ItemsContainer>
        </Container>
    );
};

export default Trending;

/* 2023.05.08 MusicList Tranding (트랜딩 컨테이너) 컴포넌트 구현 - 홍혜란 */
const Container = styled.div`
    display: flex;
    flex-direction: column;
    overflow-x: auto;
    gap: 16px;
    padding: 16px 0;
    width: 100%;
    margin-top: 40px;
    @media (max-width: 700px) {
        margin-top: 0px;
    }
`;

/* 2023.05.08 MusicList Tranding (타이틀 컨테이너) 컴포넌트 구현 - 홍혜란 */
const TrTitleContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
`;

/* 2023.05.08 MusicList Tranding (타이틀) 컴포넌트 구현 - 홍혜란 */
const TrTitle = styled.div`
    font-size: 1.5rem;
    font-weight: 700;
    color: hsl(0, 0%, 100%);
    margin: 10px 0px;
`;

/* 2023.05.11 MusicList Tranding (리스트 나올 박스) 컴포넌트 구현 / slideIn 애니메이션 - 홍혜란 */
const Item = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    opacity: 0;
    transform: translateX(-20px);
    animation: slideIn 1s ease-in-out forwards;

    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(-20px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    @media screen and (max-width: 800px) {
        margin-left: 10px;
    }
`;

/* 2023.05.08 MusicList Tranding (트랜딩 리스트 컨테이너) 컴포넌트 구현 - 홍혜란 */
const ItemsContainer = styled.div`
    display: flex;
    flex-direction: row;
    font-family: 'Rajdhani', sans-serif;
    @media screen and (max-width: 1200px) {
        & ${Item}:nth-child(6) {
            display: none;
        }
    }
    @media screen and (max-width: 1100px) {
        & ${Item}:nth-child(5) {
            display: none;
        }
    }
    @media screen and (max-width: 1000px) {
        & ${Item}:nth-child(4) {
            display: none;
        }
    }
`;

/* 2023.05.08 MusicList Tranding (노래 앨범 커버) 컴포넌트 구현 - 홍혜란 */
const Image = styled.img`
    width: 130px;
    height: 130px;
    border-radius: 10%;
    object-fit: cover;
    @media screen and (max-width: 700px) {
        width: 100px;
        height: 100px;
    }
`;

/* 2023.05.08 MusicList Tranding (노래 제목) 컴포넌트 구현 - 홍혜란 */
const Title = styled.p`
    font-size: 1rem;
    color: hsl(0, 0%, 100%);
    font-weight: 500;
    letter-spacing: 0.5px;
    margin-top: 10px;
`;

/* 2023.05.08 MusicList Tranding (노래 가수 이름) 컴포넌트 구현 - 홍혜란 */
const Artist = styled.p`
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.6);
    margin-top: 8px;
`;
