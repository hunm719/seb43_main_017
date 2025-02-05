import { atom } from 'recoil';
import { MusicData } from 'src/types/Musiclist';
import { UserInfo } from 'src/types/Mypage';

/* 2023.05.06 사용자의 이름을 nameState라는 새로운 상태를 정의 - 홍혜란 */
export const nameState = atom({
    key: 'nameState',
    default: 'Undefined',
});

/* 2023.05.06 사용자의 자기소개를 introState라는 새로운 상태를 정의 - 홍혜란 */
export const introState = atom({
    key: 'introState',
    default: 'Undefined is good people',
});

/* 2023.05.10 뮤직리스트 카테고리 클릭시 태그 생성 상태 관리 - 홍혜란 */
export const selectedTagsState = atom<string[]>({
    key: 'selectedTagsState',
    default: [],
});

/* 2023.05.11 서치 상태 관리 - 홍혜란 */
export const searchItemState = atom<string>({
    key: 'searchItem',
    default: '',
});

/* 2023.05.11 서치 결과 상태 관리 - 홍혜란 */
export const searchResultState = atom({
    key: 'searchResultState',
    default: [],
});

/* 2023.05.10 로그인이 발급받는 엑세스토큰 상태 관리 - 박수범 */
export const accessToken = atom<string | null>({
    key: 'accessToken',
    default: '',
});

/* 2023.05.14 선택된 메뉴 인덱스 - 김주비 */
export const selectIndexState = atom<number>({
    key: 'selectIndexState',
    default: Number(sessionStorage.getItem('index')),
});

/* 2023.05.14 선택된 메뉴 인덱스 (세션스토리지) - 김주비 */
export const localIndexState = atom<string | null>({
    key: 'localIndexState',
    default: sessionStorage.getItem('index'),
});

/* 2023.05.14 코멘트창 open 상태 관리 - 김주비 */
export const commentOpenState = atom<boolean>({
    key: 'commentOpenState',
    default: false,
});

/* 2023.05.15 하단사운드바 open 상태 관리 - 김주비 */
export const soundbarOpenState = atom<boolean>({
    key: 'soundbarOpenState',
    default: false,
});

export const downloadLink = atom<string>({
    key: 'downloadLink',
    default: '',
});

/* 2023.05.16 마이플레이리스트 메뉴 모달 창 상태관리 - 홍혜란 */
export const modalState = atom<boolean>({
    key: 'modalState',
    default: false,
});

/* 2023.05.16 뮤직리스트 출력 상태 관리 - 홍혜란 */
export const musicDataListState = atom<MusicData[]>({
    key: 'musicDataListState',
    default: [],
});

/* 2023.05.18 비디오 업로드 여부 상태관리 - 박수범 */
export const videouploadState = atom<boolean>({
    key: 'videoupload',
    default: false,
});

export const showSearch = atom<boolean>({
    key: 'showSearch',
    default: false,
});

/* 2023.05.19 마이페이지 유저정보 출력 상태 관리 - 홍혜란 */
export const userInfoState = atom<UserInfo[]>({
    key: 'userInfoState',
    default: [],
});
