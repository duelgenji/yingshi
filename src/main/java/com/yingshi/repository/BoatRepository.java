package com.yingshi.repository;

import com.wonders.xlab.framework.repository.MyRepository;
import com.yingshi.entity.Boat;

public interface BoatRepository extends MyRepository<Boat, Long> {
    Boat findByBoatNo(int boatNo);

}
