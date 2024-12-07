package com.champ.book.common;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PageResponse<T> {

    private List<T> content; // list of all the objects
    private int number; // page number
    private int size; // page size
    private long totalElements;
    private int totalPages;
    private boolean first; // to know whether we are at 1st page or last page or not.
    private boolean last;

}
