package com.green.Team2Project.range.controller;

import com.green.Team2Project.range.rangeService.RangeServiceImpl;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.naming.Name;

@Controller
@RequestMapping("/range")
public class RangeController {
    @Resource(name = "rangeService")
    private RangeServiceImpl rangeService;

    @PostMapping("/selectAllrange")
    @ResponseBody
    public void selectAllRange(){
        rangeService.selectAllRange();

    }
}
