package com.green.Team2Project.electricAccidentsByDay.service;

import com.green.Team2Project.electricAccidentsByDay.vo.ElectricAccidentsByDayVO;
import com.green.Team2Project.home.vo.SearchVO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Objects;

@Service("electricAccidentsByDayService")
public class ElectricAccidentsByDayServiceImpl implements ElectricAccidentsByDayService{
    @Autowired
    private SqlSessionTemplate sqlSession;

    @Override
    public ElectricAccidentsByDayVO selectAccidentDay() {
        return sqlSession.selectOne("electricAccidentsByDayMapper.selectAccidentDay");
    }

    @Override
    public Map<String, Object> avgDay() {
        return sqlSession.selectOne("electricAccidentsByDayMapper.avgDay");
    }

    @Override
    public List<ElectricAccidentsByDayVO> allDay() {
        return sqlSession.selectList("electricAccidentsByDayMapper.allDay");
    }

    @Override
    public Map<String , Object> selectDay(int occurredYear) {
        return sqlSession.selectOne("electricAccidentsByDayMapper.selectDay",occurredYear);
    }
}
