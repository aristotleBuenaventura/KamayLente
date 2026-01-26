# Build Issue Tracking: react-native-worklets-core

## Current Issue

**Status**: ⚠️ Blocking Build  
**Date**: January 26, 2026  
**Error**: CMake cannot find `hermes-engine::libhermes` target

### Error Details
```
CMake Error at CMakeLists.txt:24 (add_library): 
Target "rnworklets" links to target "hermes-engine::libhermes" 
but the target was not found.
```

### Root Cause
`react-native-worklets-core` v1.6.2 has a compatibility issue with:
- React Native 0.83.0
- New Architecture enabled (`newArchEnabled=true`)
- Hermes enabled (`hermesEnabled=true`)

The library's CMakeLists.txt expects a Hermes prefab target that isn't available in the current React Native 0.83 setup.

## Monitoring for Fixes

### GitHub Issues to Watch
1. **react-native-worklets-core**: https://github.com/margelo/react-native-worklets-core/issues
   - Search for: "hermes-engine::libhermes", "RN 0.83", "new architecture"
   - Key issues: #229, #241, #130

2. **React Native**: https://github.com/facebook/react-native/issues
   - Search for: "worklets-core", "hermes prefab"

### Package Updates to Check
```bash
# Check for updates
npm outdated react-native-worklets-core

# Check latest version
npm view react-native-worklets-core version
```

### When a Fix is Available

1. **Update the package**:
   ```bash
   npm install react-native-worklets-core@latest
   ```

2. **Clean build**:
   ```bash
   cd android
   ./gradlew clean
   cd ..
   ```

3. **Rebuild**:
   ```bash
   npm run android
   ```

## Current Workaround (If Needed)

If you need the app to build immediately, you can temporarily disable the new architecture:

1. Edit `android/gradle.properties`:
   ```properties
   newArchEnabled=false
   ```

2. Clean and rebuild:
   ```bash
   cd android && ./gradlew clean && cd ..
   npm run android
   ```

**Note**: Disabling new architecture may affect other features. Re-enable it once the fix is available.

## Related Packages
- `react-native-reanimated`: ^4.2.1 (depends on worklets-core)
- `react-native-vision-camera`: ^4.7.3 (uses frame processors)
- `vision-camera-resize-plugin`: ^3.2.0 (uses worklets)

## Alternative Solutions (If Fix Takes Too Long)

1. **Downgrade React Native** (not recommended):
   - Move to RN 0.76 or earlier where worklets-core is known to work
   - This would require significant changes

2. **Use alternative frame processing**:
   - Consider using `react-native-vision-camera` without frame processors
   - Process frames on JS thread (less performant)

3. **Fork and patch**:
   - Fork `react-native-worklets-core`
   - Apply a manual fix to CMakeLists.txt
   - Use the patched version

## Next Steps

1. ✅ Issue documented
2. ⏳ Monitor GitHub issues
3. ⏳ Check for package updates weekly
4. ⏳ Test fix when available

## Last Checked
- Date: January 26, 2026
- react-native-worklets-core version: 1.6.2
- React Native version: 0.83.0

## Workaround Applied
- ❌ **Workaround NOT applicable**: `newArchEnabled=false` is not supported in React Native 0.83+
- **Date checked**: January 26, 2026
- **Status**: No workaround available - must wait for library update or downgrade RN

## Current Status (RN 0.83.0)
- **Issue**: `react-native-worklets-core` v1.6.2 cannot find `hermes-engine::libhermes` target
- **Root cause**: CMakeLists.txt expects Hermes prefab that isn't available in RN 0.83's new architecture
- **Impact**: Blocks all frame processor functionality (VisionCamera, Reanimated, etc.)
- **Current Solution**: ✅ **Simplified camera implementation** - Frame processors removed from CameraScreen.tsx
  - Camera now works without frame processors
  - Real-time YOLOv11 detection temporarily disabled
  - Photo capture still available
  - Can re-enable detection code when fix is available

## Temporary Workaround Applied
- ✅ **Simplified CameraScreen.tsx**: Removed frame processor code
- ✅ **Updated babel.config.js**: Commented out worklets plugin
- **Date applied**: January 26, 2026
- **Note**: Detection code is preserved in comments/history - can be re-enabled when fix is available

## Options When Fix is Available
1. Wait for `react-native-worklets-core` update that supports RN 0.83 (recommended)
2. Downgrade to React Native 0.76 or earlier (not recommended - major breaking changes)
