import React, { useEffect, useState } from 'react';
import {Grid, Typography} from '@material-ui/core';
import styled from 'styled-components';
import COLORS  from '../styles/colors';

import AccessTimeOutlinedIcon from '@material-ui/icons/AccessTimeOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import PermContactCalendarOutlinedIcon from '@material-ui/icons/PermContactCalendarOutlined';

const MessageWrapper = styled('div')`
    background-color: ${COLORS.grayColor};
    padding: 20px;
    display: flex;
    flex-direction: column;
    border-radius: 10px;

    ${(props) => props.is_attendant ? `
        background-color: ${COLORS.mainColor};
    ` : `
        background-color: ${COLORS.lightGrayColor}
    `};
`

const MessageGrid = styled(Grid)`
    ${(props) => props.is_attendant ? `
        justify-content: flex-end;
    ` : `
        justify-content: flex-start;
    `};
`

const Message = styled('div')`
    display: flex;
    flex-direction: column;

    ${(props) => props.is_attendant ? `
        align-items: flex-end;
    ` : `
        align-items: flex-start;
    `};
`;

const MessageFlag = styled('div')`
    height: 30px;
    width: 30px;
    display: block;
    content: '';
    margin-top: -23px;
    border: 20px solid;

    ${(props) => props.is_attendant ? `
        border-color: transparent ${COLORS.mainColor} transparent transparent;
    ` : `
        border-color: transparent transparent transparent ${COLORS.lightGrayColor};
    `};
`;

const MessageText = styled('p')`
    color: ${COLORS.lightColor};
    font-size: 1em;
`

const MessageHour = styled('small')`
    color: #54545f;
    font-size: 0.8em;
    font-weight: 600;
    margin-top: 10px;
    margin-bottom: 0px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`

const MessageContent = styled('div')`
    display: flex;
    flex-direction: column;
    ${(props) => props.is_attendant ? `
        align-items: flex-end;
    ` : `
        align-items: flex-start;
    `};
`

const MessageContainer = styled('div')`
    display: flex;
    align-items: flex-end;
    margin-bottom: 30px;

    ${(props) => props.is_attendant ? `
        flex-direction: row;
    ` : `
        flex-direction: row-reverse;
    `};
`

const MessageIcon = styled('div')`
    background: ${props => props.bgColor && props.bgColor}40;
    border-radius: 1000px;
    padding: 10px;
    display: flex;
    justify-content: center;
    aling-items: center;
    height: 55px;
    width: 55px;
    margin: 10px;
`

function MessageItem ({text, hour, is_attendant, name, email, to, from}){

    return (
        <MessageGrid container is_attendant={is_attendant}>
            <MessageContainer is_attendant={is_attendant}>
                <MessageContent is_attendant={is_attendant}>
                    <Message is_attendant={is_attendant}>
                        <MessageWrapper is_attendant={is_attendant}>
                            <MessageText>
                                {text}
                            </MessageText>
                            <MessageHour>
                                <AccessTimeOutlinedIcon fontSize="small"/> {hour}
                            </MessageHour>
                        </MessageWrapper>
                        <MessageFlag is_attendant={is_attendant}/>
                    </Message>
                    <MessageHour>
                        {name}
                    </MessageHour>
                </MessageContent>
                {is_attendant ? (
                    <MessageIcon bgColor={COLORS.textGrayColor}>
                        <PermContactCalendarOutlinedIcon className="main-color" fontSize="large"/>
                    </MessageIcon>
                ) : (
                    <MessageIcon bgColor={COLORS.lightGrayColor}>
                        <AccountCircleOutlinedIcon className="text-gray-color" fontSize="large"/>
                    </MessageIcon>
                )}
            </MessageContainer>
            
        </MessageGrid>
        
    )
}

export {MessageItem}