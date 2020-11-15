import { useCallback, useEffect, useState } from "react";

type IStatus = "idle" | "loading" | "done" | "error";

/**
 *
 * @param _immediate 즉시 카메라 리스트를 불러올 지 결정합니다.
 * @return [카메라리스트 불러오는 상태, 카메라 디바이스 리스트, 디바이스 리로딩 트리거 함수]
 */
export function useCameraList(
  _immediate = false
): [IStatus, MediaDeviceInfo[], () => Promise<void>] {
  const [status, setStatus] = useState<IStatus>("idle");
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);

  // NOTE useCallback을 안 쓸 경우 함수가 계속 생성된다.
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

/**
 * @return [카메라 스트림 불러오는 상태, 카메라 스트림, 디바이스 ID가 바뀔 경우 트리거할 함수];
 */
export function useCameraStream(): [
  IStatus,
  MediaStream,
  (_deviceId: string) => void
] {
  const [status, setStatus] = useState<IStatus>("idle");
  const [stream, setStream] = useState<MediaStream>();
  const [deviceId, setDeviceId] = useState<string>("");

  const changeDeviceId = useCallback((_deviceId: string) => {
    setStatus("loading");
    setDeviceId(_deviceId);
  }, []);

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

  useEffect(() => {
    if (deviceId === "" || deviceId === "default") {
      setStatus("idle");
      setStream(null);
      return;
    }
    (async () => {
      try {
        setStatus("loading");
        setStream(await getStream({ deviceId: { exact: deviceId } }));
        setStatus("done");
      } catch (e) {
        setStatus("error");
        setStream(null);
        console.error("카메라 스트림 얻어오기 실패: ", e);
      }
    })();
  }, [deviceId, getStream]);

  // 떠날 때 스트림을 정리한다.
  useEffect(() => {
    return () => {
      if (stream) {
        for (const track of stream.getTracks()) track.stop();
      }
    };
  }, [stream]);

  return [status, stream, changeDeviceId];
}
