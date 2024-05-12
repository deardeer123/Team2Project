package com.green.Team2Project.disaster.service;

import com.green.Team2Project.disaster.vo.DisasterVO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("disasterService")
public class DisasterServiceImpl implements DisasterService{
    @Autowired
    private SqlSessionTemplate sqlSession;


    @Override
    public List<DisasterVO> selectAllDisaster() {
        return sqlSession.selectList("disasterMapper.selectAllDisaster");
    }

    @Override
    public DisasterVO selectOneDisaster(int occurredYear) {
        return sqlSession.selectOne("disasterMapper.selectOneDisaster",occurredYear);
    }

    @Override
    public DisasterVO mainAvgDisaster() {
        return sqlSession.selectOne("disasterMapper.mainAvgDisaster");
    }
}
