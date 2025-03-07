


import { PropertyRepository } from "../repositories/propertyRepository"
import {Service } from 'typedi';
import { Request, Response } from "express";
@Service()
export class PropertyService {

    constructor (private propertyRepo: PropertyRepository){}

    getProperties = (req:Request,res:Response)=>{
       return this.propertyRepo.findAll(req,res)
    }
}