import styled from 'styled-components';
import Slider from './Silder';
import { useState } from 'react';

function Playlist() {
    const [bgSrc, setBgSrc] = useState<string>('');

    return (
        <PlaylistSection>
            <PlaylistBackground url={bgSrc}></PlaylistBackground>
            <PlaylistHeader>
                <div className="flex-center">
                    <Pltitle>
                        <span className="pl-title">PLAYLIST</span>
                    </Pltitle>
                    <Plsubtext>
                        <span className="pl-subtext">Enjoy the various playlists of users</span>
                    </Plsubtext>
                </div>
                <div className="flex-center">
                    <Plsearch placeholder="태그를 검색해주세요" />
                </div>
            </PlaylistHeader>
            <PlaylistContents>
                <Slider setBgSrc={setBgSrc} />
            </PlaylistContents>
        </PlaylistSection>
    );
}

export default Playlist;

/**2023-05-05 플레이리스트 전체섹션 : 김주비*/
const PlaylistSection = styled.section`
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100vw;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ccc;
    overflow: hidden;
`;
interface url {
    url: string;
}
/**2023-05-06 ScaleOver 되는 백그라운드 애니메이션 : 김주비 */
const PlaylistBackground = styled.article<url>`
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 100vh;
    background: url(${(props) => props.url});
    filter: blur(10px);
    background-size: cover;
    opacity: 0.2;
    animation: bgScale 20s infinite;
    @keyframes bgScale {
        50% {
            transform: scale(1.2);
        }
    }
`;
/**2023-05-06 플레이리스트 상단 섹션 : 김주비 */
const PlaylistHeader = styled.article`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 60%;
    z-index: 2;
    > div {
        margin: 10px;
    }
    .flex-center {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .flex-center > * {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
    }
    @keyframes movingtext {
        100% {
            transform: translateY(0px);
        }
    }
`;
/**2023-05-06 슬라이드 업 되는 타이틀 애니메이션 - 타이틀 : 김주비*/
const Pltitle = styled.div`
    position: relative;
    height: 70px;
    overflow: hidden;
    .pl-title {
        font-family: 'Monoton', cursive;
        font-size: 4rem;
        transform: translateY(70px);
        animation: movingtext 1s forwards 0.5s;
    }
`;
/**2023-05-06 슬라이드 업 되는 서브텍스트 애니메이션 : 김주비*/
const Plsubtext = styled.div`
    position: relative;
    height: 20px;
    margin-top: 10px;
    overflow: hidden;
    .pl-subtext {
        font-family: 'Rajdhani', sans-serif;
        font-size: 16px;
        transform: translateY(20px);
        animation: movingtext 1s forwards 1s;
        opacity: 0.6;
    }
`;
/**2023-05-06 펼쳐지는 서치바 애니메이션 : 김주비*/
const Plsearch = styled.input`
    border-radius: 30px;
    width: 0%;
    background: rgb(255, 255, 255, 0.2);
    animation: showinput 1s forwards 2s;
    opacity: 0;

    ::placeholder {
        color: #969696;
        font-family: 'Rajdhani', sans-serif;
    }
    @keyframes showinput {
        100% {
            opacity: 1;
            width: 100%;
            padding: 10px 30px;
            border: 2px solid #b1b1b1;
            color: #dddddd;
            outline: none;
            border-radius: 30px;
        }
    }
`;
/**2023-05-06 플레이리스트 슬라이드 섹션 : 김주비 */
const PlaylistContents = styled.article`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 400px;
    margin-top: 20px;
    opacity: 0;
    animation: opacity 2s forwards 3s;
    @keyframes opacity {
        100% {
            opacity: 1;
        }
    }
`;
