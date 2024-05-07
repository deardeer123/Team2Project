package com.green.Team2Project.causing.service;

import com.green.Team2Project.causing.vo.CausingVO;

import java.util.List;

public interface CausingService {

    //화재 발생 요인 목록
    List<CausingVO> selectAllCausing();
}
