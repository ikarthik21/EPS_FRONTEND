pragma solidity ^0.5.16;

pragma experimental ABIEncoderV2;

contract Evidence {
  string public name = 'Evidence';

  mapping(uint => Case) public cases;
  mapping(uint => mapping(uint => File)) public caseFiles;

  struct Case {
    uint caseId;
    uint invid;
    string cname;
    string cnotes;
    string cdesc;
  }

  struct File {
    uint fileId;
    string name;
    uint256 size;
    string fileType;
    string ipfsPath;
    string uploadTime;
    address payable uploader;
  }

  event CaseUploaded(
    uint caseId,
    uint invid,
    string cname,
    string cnotes,
    string cdesc
  );

  event FileUploaded(
    uint caseId,
    uint fileId,
    string fileHash,
    uint256 fileSize,
    string fileType,
    string fileName,
    string uploadTime,
    address payable uploader
  );

  constructor() public {
  }

  function uploadCaseWithFiles(
    uint _caseId,
    uint _invid,
    string memory _cname,
    string memory _cnotes,
    string memory _cdesc,
    string[] memory _fileNames,
    uint256[] memory _fileSizes,
    string[] memory _fileTypes,
    string[] memory _ipfsPaths,
    string[] memory _uploadTimes
  )
    public
  {
    // Make sure the case ID is unique
    require(cases[_caseId].caseId == 0, "Case ID already exists");

    // Make sure the investigator ID exists
    require(_invid > 0, "Invalid investigator ID");

    // Make sure case name exists
    require(bytes(_cname).length > 0, "Case name is required");

    // Make sure case description exists
    require(bytes(_cdesc).length > 0, "Case description is required");

    // Create a new Case instance
    Case memory newCase;
    newCase.caseId = _caseId;
    newCase.invid = _invid;
    newCase.cname = _cname;
    newCase.cnotes = _cnotes;
    newCase.cdesc = _cdesc;

    // Add Case to the contract
    cases[_caseId] = newCase;

    // Upload files to the Case
    for (uint i = 0; i < _fileNames.length; i++) {
      uint fileId = i + 1;
      caseFiles[_caseId][fileId] = File(
        fileId,
        _fileNames[i],
        _fileSizes[i],
        _fileTypes[i],
        _ipfsPaths[i],
        _uploadTimes[i],
        msg.sender
      );

      // Trigger an event for each file uploaded
      emit FileUploaded(
        _caseId,
        fileId,
        _ipfsPaths[i],
        _fileSizes[i],
        _fileTypes[i],
        _fileNames[i],
        _uploadTimes[i],
        msg.sender
      );
    }

    // Trigger an event for the case uploaded
    emit CaseUploaded(_caseId, _invid, _cname, _cnotes, _cdesc);
  }

  function getFile(uint _caseId, uint _fileId) public view returns (File memory) {
    return caseFiles[_caseId][_fileId];
  }
}
