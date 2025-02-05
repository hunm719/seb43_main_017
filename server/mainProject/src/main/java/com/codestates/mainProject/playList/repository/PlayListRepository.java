package com.codestates.mainProject.playList.repository;


import com.codestates.mainProject.playList.entity.PlayList;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PlayListRepository extends JpaRepository<PlayList, Long> {
    Optional<PlayList> findByMemberMemberIdAndPlayListId(Long memberId, Long playListId);
}