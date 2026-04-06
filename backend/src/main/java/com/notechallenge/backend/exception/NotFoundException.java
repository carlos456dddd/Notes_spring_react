package com.notechallenge.backend.exception;

public class NotFoundException extends  RuntimeException {

    public NotFoundException (String msj){
        super(msj);
    }
}
