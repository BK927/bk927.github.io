import React from "react";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { Box } from "@material-ui/core";
import useStyles from "asset/style/style";
import PropTypes from 'prop-types';




function FileUpload(props) {
  const classes = useStyles();

  return (
    <Box className={classes.filebox}>
      <h1>카카오톡 대화 내보내기 기능을 사용해서 파일을 업로드 해 주세요</h1>
      <Box>
        <input
          accept=".txt"
          style={{ display: "none" }}
          id="upload-button"
          type="file"
          onChange={props.uploadEvent}
        />
        <label htmlFor="upload-button">
          <Button
            startIcon={<CloudUploadIcon />}
            className={classes.uploadButton}
            component="span">
            업로드
          </Button>
        </label>
      </Box>
    </Box>
  );
}

FileUpload.propTypes = {
  uploadEvent: PropTypes.func.isRequired,
};

export default FileUpload;
