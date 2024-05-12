package com.green.Team2Project.geo.service;

import com.green.Team2Project.geo.vo.GeoVO;

import java.util.List;
import java.util.Map;
import java.util.Objects;

public interface GeoService {

    List<Map<String, Integer>> geoSelect(GeoVO geoVO);
    //총 화재 정보
    Map<String,Object> totalAreaData();
    //연도 검색
    List<Integer> selectYearList();
    //하나 전체 지역 검색
    Map<String, Object> selectAreaDataOne(int occurredYear);
    //수도권 검색
    Map<String, Object> selectCapitalAreaDataOne(int occurredYear);
    //수도권 총계 데이터
    Map<String, Object> totalCapitalAreaData();
    //중부권 검색
    Map<String, Object> selectMiddleAreaDataOne(int occurredYear);
    //중부권 총계 데이터
    Map<String, Object> totalMiddleAreaData();
    //남부권 검색
    Map<String, Object> selectSouthAreaDataOne(int occurredYear);
    //남부권 총계 데이터
    Map<String, Object> totalSouthAreaData();
//    메인페이지 지도 정보
    List<Map<String,Integer>> mainGeoData(String area);
// 메인페이지 평균값 정보
    Map<String, Object> mainAvgAreaData();
}
