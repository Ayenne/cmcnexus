import React from 'react'

import {
  Button
} from './style';

import styled from 'styled-components'
import PacmanLoader from "react-spinners/PacmanLoader";
import Axios from '../../axios/not_authenticated';
import {CardBox} from '../../styles/GenericBoxes';
import {Table} from '../../styles/Tables'

const Wrapper = styled.section`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 100%;
height: 100%;
background: #E5E5E5;
;`

const Rectangle = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
width: 850px;
height: 90%;
left: 0px;
top: 0px;
background: #FFFFFF;
opacity: 0.7;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 5px;
`;

const Column = styled.div`
display: flex;
justify-content: flex-end;
width: 50%;
float: left;
flex: 50%;
//height: 90%;
left: 0px;
top: 0px;
//background: #FFFFFF;
opacity: 0.7;
border-radius: 5px;
`;

const MiniTab = styled.div`
width: 70%;
`;

const User = styled.div`
position: absolute;
margin-left: 237px;
margin-right: 237px;
width: 375px;
//height: 56px;
top: 100px;
border-bottom: 3px solid #FF0000;
justify-content: center;
font-family: Arial;
font-style: normal;
font-weight: bold;
font-size: 48px;
line-height: 56px;
color: #000000;
`;

const GeneralElements = styled.div`
display: flex;
color: black;
//width: 200px;
//height: 21px;
//left: 485px;
//top: 267px;
font-size: 1.5rem;
margin-bottom: 1rem;
font-family: Arial;
font-style: normal;
font-weight: normal;
//font-size: 18px;
line-height: 21px;
/* identical to box height */
justify-content: center;
`;




export default function UserProfile() {
return (
	<Wrapper>
		<Rectangle>
			<User>
			USER PROFILE
			</User>
				<GeneralElements>
					<Column>
						<MiniTab>
							First Name
						</MiniTab>
					</Column>
					<Column>
						<MiniTab>
							John
						</MiniTab>
					</Column>
				</GeneralElements>
				<GeneralElements>
					<Column>
						<MiniTab>
							Last Name
						</MiniTab>
					</Column>
					<Column>
						<MiniTab>
							Doe
						</MiniTab>
					</Column>
				</GeneralElements>
				<GeneralElements>
					<Column>
						<MiniTab>
							Phone
						</MiniTab>
					</Column>
					<Column>
						<MiniTab>
							+41 22 849 84 84
						</MiniTab>
					</Column>
				</GeneralElements>
				<GeneralElements>
					<Column>
						<MiniTab>
							Created
						</MiniTab>
					</Column>
					<Column>
						<MiniTab>
							April 6 2020
						</MiniTab>
					</Column>
				</GeneralElements>
				<GeneralElements>
					<Column>
						<MiniTab>
							Role
						</MiniTab>
					</Column>
					<Column>
						<MiniTab>
							Case Coordinator
						</MiniTab>
					</Column>
				</GeneralElements>
				<GeneralElements>
					<Column>
						<MiniTab>
							Organisation
						</MiniTab>
					</Column>
					<Column>
						<MiniTab>
							Doctors Without Borders
						</MiniTab>
					</Column>
				</GeneralElements>
				<GeneralElements>
					<Column>
						<MiniTab>
							Case Created
						</MiniTab>
					</Column>
					<Column>
						<MiniTab>
							7
						</MiniTab>
					</Column>
				</GeneralElements>
			<Button>
				Edit
			</Button>
		</Rectangle>
	</Wrapper>
)
}