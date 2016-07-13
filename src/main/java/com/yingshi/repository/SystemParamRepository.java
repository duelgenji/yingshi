package com.yingshi.repository;

import com.wonders.xlab.framework.repository.MyRepository;
import com.yingshi.entity.SystemParam;

/**
 * Created by Knight on 2016/7/13 9:40.
 */
public interface SystemParamRepository extends MyRepository<SystemParam, Long> {

    SystemParam findByName(String name);

}
