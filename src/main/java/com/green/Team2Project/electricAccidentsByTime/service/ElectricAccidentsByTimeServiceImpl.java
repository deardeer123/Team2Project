package com.green.Team2Project.electricAccidentsByTime.service;

import com.green.Team2Project.electricAccidentsByTime.vo.ElectricAccidentsByTimeVO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service("electricAccidentsByTimeService")
public class ElectricAccidentsByTimeServiceImpl implements ElectricAccidentsByTimeService{
    private SqlSessionTemplate sqlSession;

    @Autowired
    public ElectricAccidentsByTimeServiceImpl(SqlSessionTemplate sqlSession){
        this.sqlSession = sqlSession;
    }

    @Override
    public List<ElectricAccidentsByTimeVO> selectDayTimeList(int occurredYear) {
        return sqlSession.selectList("electricAccidentsByTimeMapper.selectDayTimeList",occurredYear);
    }

    @Override
    public List<ElectricAccidentsByTimeVO> selectNightList(int occurredYear) {
        return sqlSession.selectList("electricAccidentsByTimeMapper.selectNightList",occurredYear);
    }

    @Override
    public List<ElectricAccidentsByTimeVO> selectLateNightList(int occurredYear) {
        return sqlSession.selectList("electricAccidentsByTimeMapper.selectLateNightList",occurredYear);
    }

    @Override
    public Map<String, Object> selectAvgTimeDataList() {
        return sqlSession.selectOne("electricAccidentsByTimeMapper.selectAvgTimeDataList");
    }

    @Override
    public Map<String, Object> selectAvgTimeDataList2() {
        return sqlSession.selectOne("electricAccidentsByTimeMapper.selectAvgTimeDataList2");
    }

    @Override
    public Map<String, Object> selectAllTimeDataList() {
        return sqlSession.selectOne("electricAccidentsByTimeMapper.selectAllTimeDataList");
    }
}
