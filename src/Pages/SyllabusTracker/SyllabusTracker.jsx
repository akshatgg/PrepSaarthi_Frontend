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
    //   if (tracker.division === 11 && tracker.subject === "Chemistry") {
    //     const newData = [
    //       { unit: 'Mole Concept', theory: false, examples: false, questions: false, pyqs: false, test: false, revision1: false, revision2: false },
    //       { unit: 'Atomic Structure', theory: false, examples: false, questions: false, pyqs: false, test: false, revision1: false, revision2: false },
    //       { unit: 'Thermodynamics and Thermochemistry', theory: false, examples: false, questions: false, pyqs: false, test: false, revision1: false, revision2: false },
    //       { unit: 'Chemical Equilibrium', theory: false, examples: false, questions: false, pyqs: false, test: false, revision1: false, revision2: false },
    //       { unit: 'Ionic Equilibrium', theory: false, examples: false, questions: false, pyqs: false, test: false, revision1: false, revision2: false },
    //       { unit: 'Periodic Table', theory: false, examples: false, questions: false, pyqs: false, test: false, revision1: false, revision2: false },
    //       { unit: 'Chemical Bonding', theory: false, examples: false, questions: false, pyqs: false, test: false, revision1: false, revision2: false },
    //       { unit: 'IUPAC Nomenclature', theory: false, examples: false, questions: false, pyqs: false, test: false, revision1: false, revision2: false },
    //       { unit: 'Isomerism', theory: false, examples: false, questions: false, pyqs: false, test: false, revision1: false, revision2: false },
    //       { unit: 'General Organic Chemistry (GOC)', theory: false, examples: false, questions: false, pyqs: false, test: false, revision1: false, revision2: false },
    //       { unit: 'Reaction Mechanism', theory: false, examples: false, questions: false, pyqs: false, test: false, revision1: false, revision2: false },
    //       { unit: 'Alkane, Alkene, Alkyne (Hydrocarbons)', theory: false, examples: false, questions: false, pyqs: false, test: false, revision1: false, revision2: false },
    //       { unit: 'Aromatic Hydrocarbons', theory: false, examples: false, questions: false, pyqs: false, test: false, revision1: false, revision2: false },
    //     ];
    //     setTrackerData(newData);
    //     setProgress(newData); // Update progress with the same data
    //   } else if (tracker.division === 12 && tracker.subject === "Chemistry") {
    //     const newData = [
    //         { unit: 'Volumetric Analysis', theory: false, examples: false, questions: false, pyqs: false, test: false, revision1: false, revision2: false },
    //         { unit: 'Chemical Kinetics', theory: false, examples: false, questions: false, pyqs: false, test: false, revision1: false, revision2: false },
    //         { unit: 'Electrochemistry', theory: false, examples: false, questions: false, pyqs: false, test: false, revision1: false, revision2: false },
    //         { unit: 'Halogen Derivatives', theory: false, examples: false, questions: false, pyqs: false, test: false, revision1: false, revision2: false },
    //         { unit: 'Alcohols, Phenols, and Ethers', theory: false, examples: false, questions: false, pyqs: false, test: false, revision1: false, revision2: false },
    //         { unit: 'Aldehydes and Ketones (Carbonyl Compounds)', theory: false, examples: false, questions: false, pyqs: false, test: false, revision1: false, revision2: false },
    //         { unit: 'Carboxylic Acids and Derivatives', theory: false, examples: false, questions: false, pyqs: false, test: false, revision1: false, revision2: false },
    //         { unit: 'Amines', theory: false, examples: false, questions: false, pyqs: false, test: false, revision1: false, revision2: false },
    //         { unit: 'Biomolecules', theory: false, examples: false, questions: false, pyqs: false, test: false, revision1: false, revision2: false },
    //         { unit: 'p-block Elements (Groups 13 to 18)', theory: false, examples: false, questions: false, pyqs: false, test: false, revision1: false, revision2: false },
    //         { unit: 'Coordination Compounds', theory: false, examples: false, questions: false, pyqs: false, test: false, revision1: false, revision2: false },
    //         { unit: 'd and f-Block Elements', theory: false, examples: false, questions: false, pyqs: false, test: false, revision1: false, revision2: false }
    //     ];
    //     setTrackerData(newData);
    //     setProgress(newData); // Update progress with the same data
    //   }else if (tracker.division === 11 && tracker.subject === "Physics") {
    //     const newData =[
    //         { unit: 'Maths in Physics', theory: false, examples: false, questions: false, pyqs: false, test: false, revision1: false, revision2: false },
    //         { unit: 'Unit and Dimensions', theory: false, examples: false, questions: false, pyqs: false, test: false, revision1: false, revision2: false },
    //         { unit: 'Vectors', theory: false, examples: false, questions: false, pyqs: false, test: false, revision1: false, revision2: false },
    //         { unit: '1D Motion', theory: false, examples: false, questions: false, pyqs: false, test: false, revision1: false, revision2: false },
    //         { unit: '2D Motion', theory: false, examples: false, questions: false, pyqs: false, test: false, revision1: false, revision2: false },
    //         { unit: 'Newton\'s Laws of Motion', theory: false, examples: false, questions: false, pyqs: false, test: false, revision1: false, revision2: false },
    //         { unit: 'Work, Power, Energy', theory: false, examples: false, questions: false, pyqs: false, test: false, revision1: false, revision2: false },
    //         { unit: 'Circular Motion', theory: false, examples: false, questions: false, pyqs: false, test: false, revision1: false, revision2: false },
    //         { unit: 'Center of Mass and Momentum Conservation', theory: false, examples: false, questions: false, pyqs: false, test: false, revision1: false, revision2: false },
    //         { unit: 'Rotational Motion', theory: false, examples: false, questions: false, pyqs: false, test: false, revision1: false, revision2: false },
    //         { unit: 'Gravitation', theory: false, examples: false, questions: false, pyqs: false, test: false, revision1: false, revision2: false },
    //         { unit: 'Oscillation (SHM)', theory: false, examples: false, questions: false, pyqs: false, test: false, revision1: false, revision2: false },
    //         { unit: 'Fluid Mechanics', theory: false, examples: false, questions: false, pyqs: false, test: false, revision1: false, revision2: false },
    //         { unit: 'Waves', theory: false, examples: false, questions: false, pyqs: false, test: false, revision1: false, revision2: false },
    //         { unit: 'Temperature and Thermal Properties of Matter', theory: false, examples: false, questions: false, pyqs: false, test: false, revision1: false, revision2: false },
    //         { unit: 'Kinetic Theory of Gases', theory: false, examples: false, questions: false, pyqs: false, test: false, revision1: false, revision2: false },
    //         { unit: 'Laws of Thermodynamics', theory: false, examples: false, questions: false, pyqs: false, test: false, revision1: false, revision2: false },
    //         { unit: 'Heat Transfer', theory: false, examples: false, questions: false, pyqs: false, test: false, revision1: false, revision2: false }
    //     ]
    //     setTrackerData(newData);
    //     setProgress(newData); // Update progress with the same data
    //   } else if (tracker.division === 12 && tracker.subject === "Physics") {
    //     const newData = [
    //         { unit: 'Electrostatics', theory: false, examples: false, questions: false, pyqs: false, test: false, revision1: false, revision2: false },
    //         { unit: 'Current Electricity', theory: false, examples: false, questions: false, pyqs: false, test: false, revision1: false, revision2: false },
    //         { unit: 'Magnetism', theory: false, examples: false, questions: false, pyqs: false, test: false, revision1: false, revision2: false },
    //         { unit: 'Geometric Optics and Optical Instruments', theory: false, examples: false, questions: false, pyqs: false, test: false, revision1: false, revision2: false },
    //         { unit: 'Wave Optics', theory: false, examples: false, questions: false, pyqs: false, test: false, revision1: false, revision2: false },
    //         { unit: 'Experimental Physics', theory: false, examples: false, questions: false, pyqs: false, test: false, revision1: false, revision2: false },
    //         { unit: 'Photoelectric Effect and Matter Waves', theory: false, examples: false, questions: false, pyqs: false, test: false, revision1: false, revision2: false },
    //         { unit: 'Atomic Structure', theory: false, examples: false, questions: false, pyqs: false, test: false, revision1: false, revision2: false },
    //         { unit: 'Nuclear Physics and Radioactivity', theory: false, examples: false, questions: false, pyqs: false, test: false, revision1: false, revision2: false },
    //         { unit: 'Semiconductors', theory: false, examples: false, questions: false, pyqs: false, test: false, revision1: false, revision2: false },
    //         { unit: 'Electromagnetic Induction', theory: false, examples: false, questions: false, pyqs: false, test: false, revision1: false, revision2: false },
    //         { unit: 'Alternating Current and EM Waves', theory: false, examples: false, questions: false, pyqs: false, test: false, revision1: false, revision2: false }
    //     ];
    //     setTrackerData(newData);
    //     setProgress(newData); // Update progress with the same data
      
    //   } else if (tracker.division === 11 && tracker.subject === "Maths") {
    //     const newData = [
    //         { unit: 'Sets and Relations', theory: false, examples: false, questions: false, pyqs: false, test: false, revision1: false, revision2: false },
    //         { unit: 'Trigonometric Ratios', theory: false, examples: false, questions: false, pyqs: false, test: false, revision1: false, revision2: false },
    //         { unit: 'Trigonometric Equations', theory: false, examples: false, questions: false, pyqs: false, test: false, revision1: false, revision2: false },
    //         { unit: 'Quadratic Equations', theory: false, examples: false, questions: false, pyqs: false, test: false, revision1: false, revision2: false },
    //         { unit: 'Sequences & Series', theory: false, examples: false, questions: false, pyqs: false, test: false, revision1: false, revision2: false },
    //         { unit: 'Binomial Theorem', theory: false, examples: false, questions: false, pyqs: false, test: false, revision1: false, revision2: false },
    //         { unit: 'Permutations and Combinations', theory: false, examples: false, questions: false, pyqs: false, test: false, revision1: false, revision2: false },
    //         { unit: 'Complex Numbers', theory: false, examples: false, questions: false, pyqs: false, test: false, revision1: false, revision2: false },
    //         { unit: 'Straight Lines and Pair of Straight Lines', theory: false, examples: false, questions: false, pyqs: false, test: false, revision1: false, revision2: false },
    //         { unit: 'Circles', theory: false, examples: false, questions: false, pyqs: false, test: false, revision1: false, revision2: false },
    //         { unit: 'Conic Sections (Parabola, Ellipse, Hyperbola)', theory: false, examples: false, questions: false, pyqs: false, test: false, revision1: false, revision2: false },
    //         { unit: 'Statistics', theory: false, examples: false, questions: false, pyqs: false, test: false, revision1: false, revision2: false },
    //         { unit: 'Probability', theory: false, examples: false, questions: false, pyqs: false, test: false, revision1: false, revision2: false }
    //     ];
    //     setTrackerData(newData);
    //     setProgress(newData); // Update progress with the same data
      
    //   } else if (tracker.division === 12 && tracker.subject === "Maths") {
    //     const newData = [
    //         { unit: 'Functions', theory: false, examples: false, questions: false, pyqs: false, test: false, revision1: false, revision2: false },
    //         { unit: 'Inverse Trigonometric Functions', theory: false, examples: false, questions: false, pyqs: false, test: false, revision1: false, revision2: false },
    //         { unit: 'Matrices', theory: false, examples: false, questions: false, pyqs: false, test: false, revision1: false, revision2: false },
    //         { unit: 'Determinants', theory: false, examples: false, questions: false, pyqs: false, test: false, revision1: false, revision2: false },
    //         { unit: 'Limits', theory: false, examples: false, questions: false, pyqs: false, test: false, revision1: false, revision2: false },
    //         { unit: 'Continuity & Differentiability', theory: false, examples: false, questions: false, pyqs: false, test: false, revision1: false, revision2: false },
    //         { unit: 'Methods of differentiation', theory: false, examples: false, questions: false, pyqs: false, test: false, revision1: false, revision2: false },
    //         { unit: 'Application of derivatives', theory: false, examples: false, questions: false, pyqs: false, test: false, revision1: false, revision2: false },
    //         { unit: 'Indefinite Integration', theory: false, examples: false, questions: false, pyqs: false, test: false, revision1: false, revision2: false },
    //         { unit: 'Definite Integration', theory: false, examples: false, questions: false, pyqs: false, test: false, revision1: false, revision2: false },
    //         { unit: 'Area under the curve', theory: false, examples: false, questions: false, pyqs: false, test: false, revision1: false, revision2: false },
    //         { unit: 'Differential Equation', theory: false, examples: false, questions: false, pyqs: false, test: false, revision1: false, revision2: false },
    //         { unit: 'Vector', theory: false, examples: false, questions: false, pyqs: false, test: false, revision1: false, revision2: false },
    //         { unit: 'Three-Dimensional Geometry', theory: false, examples: false, questions: false, pyqs: false, test: false, revision1: false, revision2: false },
    //         { unit: 'Probability', theory: false, examples: false, questions: false, pyqs: false, test: false, revision1: false, revision2: false }
    //     ];
    //     setTrackerData(newData);
    //     setProgress(newData); // Update progress with the same data
    //   }
      // You can add more conditions for other subjects and divisions here
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
