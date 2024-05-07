package com.green.Team2Project.disaster.controller;

import com.green.Team2Project.disaster.service.DisasterService;
import com.green.Team2Project.disaster.vo.DisasterVO;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class DisasterController {
    @Resource(name = "disasterService")
    private DisasterService disasterService;

    //전기 재해 현황 목록
    @GetMapping("/selectAllDisaster")
    public DisasterVO selectAllDisaster(){
        return disasterService.selectAllDisaster();
    }
}
