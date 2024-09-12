import logging, csv, io, json, os
from dotenv import load_dotenv
from google.cloud import storage

def TransformHandlerPython(file, context):
  if not file['name'].lower().endswith('.csv'):
    logging.warning('File is not in valid format! Please upload a CSV file.')
    return
  client = storage.Client()
  load_dotenv()
  
  try:
    # Download file as string
    sourceBucket = client.get_bucket(file['bucket'])
    sourceBlob = sourceBucket.blob(file['name'])
    csvString = sourceBlob.download_as_string()

    # Process and upload
    output = csvToJson(csvString, file['name'].split(".")[0])
    targetBucket = client.get_bucket(os.getenv('TARGET_BUCKET'))
    jsonName = file['name'].split(".")[0] + ".json"
    targetBlob = targetBucket.blob(jsonName)
    targetBlob.upload_from_string(output)
    
  except Exception as e:
    logging.warning(e)


def csvToJson(csvContents, fileName):
  reader = csv.DictReader(io.StringIO(csvContents.decode()))
  jsonFile = json.dumps(list(reader))
  return jsonFile
  
if __name__ == "__main__":
  TransformHandlerPython(file, context)
