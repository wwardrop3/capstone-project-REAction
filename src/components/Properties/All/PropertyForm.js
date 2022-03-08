import { useEffect, useState } from "react"
import { Redirect } from "react-router-dom"
import { Route } from "react-router-dom"
import { useHistory } from "react-router-dom"
import { useParams } from "react-router-dom"
import { getPropertyTypes, retrieveProperty } from "../../APIManager"
import { IndustrialProperty } from "../Industrial/IndustrialProperty"
import { MultifamilyProperty } from "../Multifamily/MultifamilyProperty"
import { OfficeProperty } from "../Office/OfficeProperty"


export const PropertyForm = () => {

    const { propertyTypeId } = useParams()
    
    const id = propertyTypeId
    
    console.log(id)

    const choiceObject = {
        "1":<MultifamilyProperty/>,
        "2":<OfficeProperty/>,
        "3":<IndustrialProperty/>
    }

    
    return (
        <Route
            render={() => {
                return choiceObject.id
            }}
                />
                
    )}
    
