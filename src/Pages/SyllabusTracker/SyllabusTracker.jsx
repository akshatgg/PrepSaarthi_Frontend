import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Paper,
  Typography,
  Box,
  useMediaQuery,
} from '@mui/material';
import { styled } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { getSyllabusTracker, updateSyllabusTracker } from '../../action/studentAction';
import Loader from '../../Components/Loader/Loader';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  border: '1px solid #dddddd',
  padding: '8px',
  textAlign: 'center',
  fontWeight: '500',
}));

const StyledHeaderCell = styled(StyledTableCell)({
  backgroundColor: '#fddede',
  fontWeight: 'bold',
  color: '#333',
});

const totalCheckboxesPerUnit = 7; // total checkable items per row
const totalUnits = 13; // number of rows in the table

// Syllabus data based on the provided example



const SyllabusTracker = ({tracker}) => {
    const [selectedCheckbox, setCheckbox] = useState()
  const [progress, setProgress] = useState([]);
  const theme = useTheme();
  const {loading, message,error} = useSelector(state => state.syllabus)
  const {loading:updateLoader, message:updatedMessage,error:updateError} = useSelector(state => state.syllabusUpdate)
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const dispatch = useDispatch()
  const handleCheckboxChange = (index, field,value,i,unit) => {
    setCheckbox({index:i, unit,field})
    dispatch(updateSyllabusTracker({unitIndex:index, field:field, value:value,subject:tracker.subject,division:tracker.division}))
  };

  // Function to calculate the completion percentage for each unit
  const calculateCompletionPercentage = (unit) => {
    const completedTasks = Object.values(unit).filter((value) => value === true).length;
    return Math.round((completedTasks / totalCheckboxesPerUnit) * 100);
  };

  // Function to calculate the overall completion percentage
  const calculateOverallCompletionPercentage = () => {
    const totalCompletedTasks = progress.reduce((sum, unit) => {
      return sum + Object.values(unit).filter((value) => value === true).length;
    }, 0);
    return Math.round((totalCompletedTasks / ((progress?.length) * totalCheckboxesPerUnit)) * 100);
  };

  useEffect(() => {
    if(updatedMessage){
        setProgress(updatedMessage)
    }
  }, [updatedMessage])
  useEffect(() => {
    if(message){
        setProgress(message)
    }
  }, [message])
useEffect(() => {
    if (tracker) {
        dispatch(getSyllabusTracker({subject:tracker.subject,division:tracker.division}))
   
    }
  }, [tracker]); 

  return (
<>
{loading? <Loader /> : 
    <Box
    sx={{
      maxWidth: '100%',
      overflowX: isMobile ? 'scroll' : 'hidden',
      mt:'20px',
      padding: '16px',
    }}
  >
    <Typography variant="h6" align="center" gutterBottom>
      Class {tracker?.division} Syllabus Tracker
    </Typography>
    <Typography variant="subtitle1" align="right" gutterBottom>
      Overall Completion: {calculateOverallCompletionPercentage()}%
    </Typography>
    <TableContainer component={Paper} style={{ minWidth: '800px' }}>
      <Table>
        <TableHead>
          <TableRow>
            <StyledHeaderCell>Units</StyledHeaderCell>
            <StyledHeaderCell>Theory & Lecture Completion</StyledHeaderCell>
            <StyledHeaderCell>30 Examples Solved</StyledHeaderCell>
            <StyledHeaderCell>45 Questions done from module</StyledHeaderCell>
            <StyledHeaderCell>25 PYQs Done</StyledHeaderCell>
            <StyledHeaderCell>Test Done</StyledHeaderCell>
            <StyledHeaderCell>Revision 1</StyledHeaderCell>
            <StyledHeaderCell>Revision 2</StyledHeaderCell>
            <StyledHeaderCell>Completion (%)</StyledHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {progress.map((row, index) => (
            <TableRow key={index}>
              <StyledTableCell>{row.unit}</StyledTableCell>
              <StyledTableCell>
                <Checkbox
                  checked={row.theory}
                  onChange={(e) => {
                      handleCheckboxChange(index, 'theory', e.target.checked, index, row.unit)
                    }
                    }
                      color="primary"
                      disabled={updateLoader && index === selectedCheckbox.index && row.unit === selectedCheckbox.unit && selectedCheckbox.field === 'theory'}
                      />
              </StyledTableCell>
              <StyledTableCell>
                <Checkbox
                  checked={row.examples}
                  onChange={(e) => handleCheckboxChange(index, 'examples', e.target.checked, index, row.unit )}
                  color="primary"
                  disabled={updateLoader && index === selectedCheckbox.index && row.unit === selectedCheckbox.unit&& selectedCheckbox.field === 'examples'}
                  />
              </StyledTableCell>
              <StyledTableCell>
                <Checkbox
                  checked={row.questions}
                  onChange={(e) => handleCheckboxChange(index, 'questions', e.target.checked, index, row.unit)}
                  color="primary"
                  disabled={updateLoader && index === selectedCheckbox.index && row.unit === selectedCheckbox.unit&& selectedCheckbox.field === 'questions'}
                  />
              </StyledTableCell>
              <StyledTableCell>
                <Checkbox
                  checked={row.pyqs}
                  onChange={(e) => handleCheckboxChange(index, 'pyqs', e.target.checked, index, row.unit)}
                  color="primary"
                  disabled={updateLoader && index === selectedCheckbox.index && row.unit === selectedCheckbox.unit&& selectedCheckbox.field === 'pyqs'}
                  />
              </StyledTableCell>
              <StyledTableCell>
                <Checkbox
                  checked={row.test}
                  onChange={(e) => handleCheckboxChange(index, 'test', e.target.checked, index, row.unit)}
                  color="primary"
                  disabled={updateLoader && index === selectedCheckbox.index && row.unit === selectedCheckbox.unit&& selectedCheckbox.field === 'test'}
                  />
              </StyledTableCell>
              <StyledTableCell>
                <Checkbox
                  checked={row.revision1}
                  onChange={(e) => handleCheckboxChange(index, 'revision1', e.target.checked, index, row.unit)}
                  color="primary"
                  disabled={updateLoader && index === selectedCheckbox.index && row.unit === selectedCheckbox.unit&& selectedCheckbox.field === 'revision1'}
                  />
              </StyledTableCell>
              <StyledTableCell>
                <Checkbox
                  checked={row.revision2}
                  onChange={(e) => handleCheckboxChange(index, 'revision2', e.target.checked, index, row.unit)}
                  color="primary"
                  disabled={updateLoader && index === selectedCheckbox.index && row.unit === selectedCheckbox.unit&& selectedCheckbox.field === 'revision2'}
                />
              </StyledTableCell>
              <StyledTableCell>
                {calculateCompletionPercentage(row)}%
              </StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Box>}
</>
  );
};

export default SyllabusTracker;
