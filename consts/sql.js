const QUERY = {
    //모임 리스트 조회
    GET_MOIM_LIST:
        "SELECT MOIM_ID AS moimId, TITLE AS title, SUBTITLE AS subtitle, MAIN_IMG AS mainImg, TYPE AS type FROM sociallounge.MOIM WHERE ( SEASON_ID = (SELECT SEASON_ID FROM sociallounge.SEASON WHERE VIEW_YN = 'Y') AND VIEW_YN = 'Y' AND TYPE = 'S') OR (TYPE = 'E' AND VIEW_YN = 'Y')",
    //모임 상세 조회
    GET_MOIM_DETAIL: "",
    //유저 정보 조회
    GET_USER_DETAIL: "",
    //유저 정보 수정
    UPDATE_USER_DETAIL: "",
    //유저 회원탈퇴
    DELETE_USER_DETAIL: "",
    //모임 후기 조회
    GET_MOIM_REVIEW: "",
    //모임 후기 생성
    ADD_MOIM_REVIEW: "",
    //모임 후기 수정
    UPDATE_MOIM_REVIEW: "",
    //모임 후기 삭제
    DELETE_MOIM_REVIEW: "",
    //신청 정보 조회
    GET_APPLY_LIST: "",
    //신청 정보 생성
    ADD_APPLY: "",
    //신청 정보 수정
    UPDATE_APPLY: "",
    //결제 완료
    PURCHASE_APPLY: "",
    //환불 처리
    REFUND_APPLY: "",
    //FAQ 조회
    GET_FAQ_LIST: "",
    //공지사항 조회
    GET_NOTICE_LIST: "",
};

module.exports = { QUERY };
