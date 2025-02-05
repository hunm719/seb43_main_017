import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { commentOpenState, soundbarOpenState, downloadLink } from 'src/recoil/Atoms';
import { musicdetail } from 'src/types/Slider';
import CommentViewer from 'src/components/musicdetail/CommentViewer';
import Sidebutton from 'src/components/musicdetail/SideButton';
import {
    DetailGroup,
    PlaylistBackground,
    DetailSection,
    AlbumRecode,
    MusicContents,
    MusicTags,
    MusicTitle,
    MusicInfo,
    MusicText,
} from 'src/components/musicdetail/style/DetailStyle';

function MusicDetail() {
    const msId = useParams();
    const [commentOpen] = useRecoilState<boolean>(commentOpenState);
    const [, setSoundbarOpen] = useRecoilState<boolean>(soundbarOpenState);
    const [formattedTime, setFormattedTime] = useState<number>(0);
    const [, setDownload] = useRecoilState<string>(downloadLink);
    const [msDetailData, setMsDetailData] = useState<musicdetail>({
        musicId: 0,
        musicName: '',
        artistName: '',
        albumName: '',
        musicTime: 0,
        albumCoverImg: '',
        musicUri: '',
        createdAt: '',
        modifiedAt: '',
    });

    useEffect(() => {
        setSoundbarOpen(true);
        axios
            .get(`http://ec2-52-78-105-114.ap-northeast-2.compute.amazonaws.com:8080/musics/${msId.msId}`)
            .then(function (response) {
                // 성공적으로 요청을 보낸 경우
                // console.log(response.data.pageInfo.totalPages);
                setMsDetailData(response.data.data);
                setFormattedTime(Number(response.data.data.musicTime));
                setDownload(response.data.data.musicUri);
            })
            .catch(function (error) {
                // 요청 중에 오류가 발생한 경우
                console.error(error);
            });
    }, []);

    const formatSecondsToTime = () => {
        const minutes = Math.floor(formattedTime / 60);
        const remainingSeconds = formattedTime % 60;
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(remainingSeconds).padStart(2, '0');
        return `${formattedMinutes}:${formattedSeconds}`;
    };
    const musicTime = formatSecondsToTime();

    return (
        <DetailGroup>
            {commentOpen ? <CommentViewer></CommentViewer> : null}
            <PlaylistBackground url={msDetailData.albumCoverImg}></PlaylistBackground>
            <AlbumRecode>
                <img src={msDetailData.albumCoverImg} />
            </AlbumRecode>
            <DetailSection>
                <MusicContents>
                    <MusicTags>
                        <li>귀여운</li>
                        <li>발랄한</li>
                        <li>즐거운</li>
                    </MusicTags>
                    <MusicTitle>
                        <span>{msDetailData.musicName}</span>
                    </MusicTitle>
                    <MusicInfo>
                        <li>CREATE</li>
                        <li>{msDetailData.artistName}</li>
                        <li>ALBUM</li>
                        <li>{msDetailData.albumName}</li>
                        <li>TIME</li>
                        <li>{musicTime}</li>
                    </MusicInfo>
                    <MusicText>
                        <span>The music information does not exist.</span>
                    </MusicText>
                </MusicContents>
                <Sidebutton />
            </DetailSection>
        </DetailGroup>
    );
}

export default MusicDetail;
