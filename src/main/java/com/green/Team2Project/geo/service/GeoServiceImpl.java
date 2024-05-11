package com.green.Team2Project.geo.service;

import com.green.Team2Project.geo.vo.GeoVO;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service("geoService")
public class GeoServiceImpl implements GeoService{
    @Autowired
    private SqlSessionTemplate sqlSession;

    @Override
    public List<Map<String, Integer>> geoSelect(GeoVO geoVO) {
        return sqlSession.selectList("geoMapper.geoSelect", geoVO);
    }

    @Override
    public Map<String,Object> totalAreaData() {
        return sqlSession.selectOne("geoMapper.totalAreaData");
    }

    @Override
    public List<Integer> selectYearList() {
        return sqlSession.selectList("geoMapper.selectYearList");
    }

    @Override
    public Map<String, Object> selectAreaDataOne(int occurredYear) {

        return sqlSession.selectOne("geoMapper.selectAreaDataOne",occurredYear);
    }

    @Override
    public Map<String, Object> selectCapitalAreaDataOne(int occurredYear) {
        return sqlSession.selectOne("geoMapper.selectCapitalAreaDataOne",occurredYear);
    }

    @Override
    public Map<String, Object> totalCapitalAreaData() {
        return sqlSession.selectOne("geoMapper.totalCapitalAreaData");
    }

    @Override
    public Map<String, Object> selectMiddleAreaDataOne(int occurredYear) {
        return sqlSession.selectOne("geoMapper.selectMiddleAreaDataOne",occurredYear);
    }

    @Override
    public Map<String, Object> totalMiddleAreaData() {
        return sqlSession.selectOne("geoMapper.totalMiddleAreaData");
    }

    @Override
    public Map<String, Object> selectSouthAreaDataOne(int occurredYear) {
        return sqlSession.selectOne("geoMapper.selectSouthAreaDataOne",occurredYear);
    }

    @Override
    public Map<String, Object> totalSouthAreaData() {
        return sqlSession.selectOne("geoMapper.totalSouthAreaData");
    }
}
