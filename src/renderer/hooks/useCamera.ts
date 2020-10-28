import { useCallback, useEffect, useRef, useState } from "react";

type IStatus = "idle" | "loading" | "done" | "error";

/**
 *
 * @param _immediate 즉시 카메라 리스트를 불러올 지 결정합니다.
 * @return [카메라 불러오는 상태, 디바이스 리스트, 디바이스 리로딩 트리거 함수]
 */
export function useCameraList(
  _immediate = false
): [IStatus, MediaDeviceInfo[], () => Promise<void>] {
  const [status, setStatus] = useState<IStatus>("idle");
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);

  // NOTE useCallback을 안 쓸 경우 함수가 계속 생성되는 듯하다... (useEffect가 무한 증식 해버림.)
  const getDevices = useCallback(async () => {
    setDevices([]);
    setStatus("loading");
    try {
      setDevices(
        (await navigator.mediaDevices.enumerateDevices()).filter(
          (val) => val.kind === "videoinput"
        )
      );
      setStatus("done");
    } catch (e) {
      console.error("카메라 리스트 불러오는 중 에러 발생...", e);
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    if (_immediate) getDevices();
  }, [_immediate, getDevices]);

  return [status, devices, getDevices];
}

export function useCameraStream(): [
  IStatus,
  MediaStream,
  (_deviceId: string) => void
] {
  const [status, setStatus] = useState<IStatus>("idle");
  const [stream, setStream] = useState<MediaStream>();
  const [deviceId, setDeviceId] = useState<string>("");

  const changeDeviceId = (_deviceId: string) => {
    console.log("트리거됨: ", _deviceId);
    setStatus("loading");
    // setStream(null);
    setDeviceId(_deviceId);
    // TODO stream 업데이트
  };

  // const currentStream = useRef<MediaStream>(undefined);

  const getStream = useCallback(
    async (constraints: MediaTrackConstraints): Promise<MediaStream> => {
      try {
        const stream: MediaStream = await navigator.mediaDevices.getUserMedia({
          video: constraints,
          audio: false,
        });
        return stream;
      } catch (e) {
        return undefined;
      }
    },
    []
  );
  // TODO 막 바꿀 때, 기존의 댕글링 스트림을 저장해야 할 것이다.
  useEffect(() => {
    if (deviceId === "") return;
    const updateStream = async () => {
      try {
        setStatus("loading");
        setStream(await getStream({ deviceId: { exact: deviceId } }));
        setStatus("done");
      } catch (e) {
        setStatus("error");
        setStream(null);
        console.error("카메라 스트림 얻어오기 실패: ", e);
      }
    };
    updateStream();
    return () => {
      // 카메라 추적 중단 스크립트.
    };
  }, [deviceId, getStream]);

  return [status, stream, changeDeviceId];
}
