package com.green.Team2Project.electricAccidentsByDay.service;

import com.green.Team2Project.electricAccidentsByDay.vo.ElectricAccidentsByDayVO;
import com.green.Team2Project.home.vo.SearchVO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("electricAccidentsByDayService")
public class ElectricAccidentsByDayServiceImpl implements ElectricAccidentsByDayService{
    @Autowired
    SqlSessionTemplate sqlSession;

    @Override
    public ElectricAccidentsByDayVO selectAccidentDay() {
        return sqlSession.selectOne("electricAccidentsByDayMapper.selectAccidentDay");
    }
}
